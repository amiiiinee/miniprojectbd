from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import seances, modules, enseignants, groupes, salles

app = FastAPI(title="Gestion Enseignements API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(seances.router, prefix="/seances", tags=["Séances"])
app.include_router(modules.router, prefix="/modules", tags=["Modules"])
app.include_router(enseignants.router, prefix="/enseignants", tags=["Enseignants"])
app.include_router(groupes.router, prefix="/groupes", tags=["Groupes"])
app.include_router(salles.router, prefix="/salles", tags=["Salles"])
