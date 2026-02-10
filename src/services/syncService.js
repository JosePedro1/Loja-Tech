import NetInfo from "@react-native-community/netinfo";
import { supabase } from "./supabase";

import {
  listarNaoSincronizados,
  marcarComoSincronizado
} from "../database/database";

let syncing = false;

export const syncData = async () => {
  if (syncing) return;

  const state = await NetInfo.fetch();
  if (!state.isConnected) return;

  try {
    syncing = true;

    const itens = await listarNaoSincronizados();

    for (const item of itens) {
      const { error } = await supabase
        .from('vendas_remotas')
        .insert({
          produto_nome: item.nome,
          preco: item.preco,
          no_carrinho: true
        });

      if (!error) {
        await marcarComoSincronizado(item.id);
      }
    }
  } catch (e) {
    console.log("Erro Sync:", e);
  } finally {
    syncing = false;
  }
};
