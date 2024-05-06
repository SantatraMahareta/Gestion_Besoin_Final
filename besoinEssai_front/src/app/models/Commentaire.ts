import { Utilisateur } from "./Utilisateur"
import { Besoin } from "./besoin"

export interface Commentaire {
    commentaireId?: number,
    texteCommentaire?: string,
    dateCommentaire: Date,
    utilisateurEmetteur?: string,
    utilisateurDestinataire?: Utilisateur,
    besoin?: Besoin,
    estLu?:boolean;
}