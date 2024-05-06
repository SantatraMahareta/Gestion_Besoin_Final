import { Departement } from "./Departement";
import { Role } from "./Role";

export interface Utilisateur {
    utilisateurId?: number,
    email?: string,
    motDePasse?: string,
    nomComplet?: string,
    role?: Role,
    departement?: Departement
}