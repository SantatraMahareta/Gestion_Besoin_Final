import { Utilisateur } from "./Utilisateur"
import { Commentaire } from "./Commentaire"
import { Application } from "./Application"
// import { SousBesoin } from "./SousBesoin"



export interface Besoin {
  besoinId?: number;
  titreBesoin?: string;
  descriptionBesoin?: string;
  priorite?: string;
  etatBesoin?: string;
  dateCreation?: Date;
  validationClient?: string;
  validationSvtfa?: string;
  validationDsi?: string;
  validationSrsgbd?: string;
  utilisateur?: Utilisateur;
  developpeurs?:Utilisateur;
  svtfaUtilisateur?:Utilisateur;
  commentaires?: Commentaire[];
  application?: Application;
  // sousBesoins?: SousBesoin[];
}