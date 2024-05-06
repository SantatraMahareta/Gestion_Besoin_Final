import { Utilisateur } from "./Utilisateur";

export interface Message {
    messageId?: number;
    texteMessage?: string;
    dateMessage?: Date;
    utilisateurEmetteur?: string;
    utilisateurDestinataire?: Utilisateur;
    estLu?:boolean;
  }
  