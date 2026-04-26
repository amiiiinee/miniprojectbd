from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db
from pydantic import BaseModel

router = APIRouter()

class SeanceCreate(BaseModel):
    id_module: int
    id_enseignant: int
    id_groupe: int
    id_salle: int
    jour: str
    heure_debut: str
    heure_fin: str
    type_seance: str

@router.get("/")
def get_seances(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT * FROM seance"))
    return result.mappings().all()

@router.post("/", status_code=201)
def create_seance(seance: SeanceCreate, db: Session = Depends(get_db)):
    # Check for conflicts
    conflict = db.execute(text("""
        SELECT id FROM seance
        WHERE jour = :jour
        AND heure_debut < :heure_fin AND heure_fin > :heure_debut
        AND (
            id_enseignant = :id_enseignant OR
            id_salle = :id_salle OR
            id_groupe = :id_groupe
        )
        LIMIT 1
    """), {
        "jour": seance.jour,
        "heure_debut": seance.heure_debut,
        "heure_fin": seance.heure_fin,
        "id_enseignant": seance.id_enseignant,
        "id_salle": seance.id_salle,
        "id_groupe": seance.id_groupe,
    }).fetchone()

    if conflict:
        raise HTTPException(status_code=409, detail="Conflit détecté : l'enseignant, la salle ou le groupe est déjà réservé sur ce créneau.")

    try:
        result = db.execute(text("""
            INSERT INTO seance (id_module, id_enseignant, id_groupe, id_salle, jour, heure_debut, heure_fin, type_seance)
            VALUES (:id_module, :id_enseignant, :id_groupe, :id_salle, :jour, :heure_debut, :heure_fin, :type_seance)
            RETURNING *
        """), seance.model_dump())
        db.commit()
        return result.mappings().fetchone()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/planning/groupe/{groupe_id}")
def planning_groupe(groupe_id: int, db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT s.jour, s.heure_debut, s.heure_fin, s.type_seance,
               m.intitule AS module, e.nom || ' ' || e.prenom AS enseignant,
               sa.nom AS salle
        FROM seance s
        JOIN module m ON s.id_module = m.id
        JOIN enseignant e ON s.id_enseignant = e.id
        JOIN salle sa ON s.id_salle = sa.id
        WHERE s.id_groupe = :gid
        ORDER BY s.jour, s.heure_debut
    """), {"gid": groupe_id})
    return result.mappings().all()

@router.get("/charge-horaire/{enseignant_id}")
def charge_horaire(enseignant_id: int, db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT SUM(EXTRACT(EPOCH FROM (heure_fin - heure_debut))/3600) AS total_heures
        FROM seance WHERE id_enseignant = :eid
    """), {"eid": enseignant_id})
    row = result.mappings().first()
    return {"total_heures": float(row["total_heures"] or 0)}
