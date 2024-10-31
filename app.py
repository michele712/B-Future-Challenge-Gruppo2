import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from typing import Optional, List
import asyncpg
from pydantic import BaseModel
from datetime import datetime, date

DATABASE_URL = os.getenv("https://official-hedwig-airoleplaychat-36373dad.koyeb.app", "postgres://koyeb-adm:RVnOogfch4u7@ep-icy-breeze-a2li0xt1.eu-central-1.pg.koyeb.app/koyebdb")
app = FastAPI()

async def get_db_connection():
    conn = await asyncpg.connect(DATABASE_URL)
    return conn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
origins = [
    "https://b-future-challenge-gruppo2-m6i8.vercel.app"
]



# Aggiungi il middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] , # Permetti tutte le origini, modifica se necessario
    allow_credentials=True,
    allow_methods=["*"],  # Permetti tutti i metodi (GET, POST, etc.)
    allow_headers=["*"],  # Permetti tutte le intestazioni
)

class BusinessUnitBase(BaseModel):
    name: str
    description: Optional[str] = None
    is_active: Optional[bool] = True

class BusinessUnitCreate(BusinessUnitBase):
    pass

class BusinessUnitUpdate(BusinessUnitBase):
    pass

class BusinessUnit(BusinessUnitBase):
    id: int
    created_at: datetime
    updated_at: datetime


class ServiceBase(BaseModel):
    name: str
    description: Optional[str] = None
    approach: Optional[str] = None
    keywords: Optional[List[str]] = None
    is_active: Optional[bool] = True

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(ServiceBase):
    pass

class Service(ServiceBase):
    id: int
    created_at: datetime
    updated_at: datetime

# Service Phase Models
class ServicePhaseBase(BaseModel):
    service_id: int
    name: str
    description: Optional[str] = None

class ServicePhaseCreate(ServicePhaseBase):
    pass

class ServicePhaseUpdate(ServicePhaseBase):
    pass

class ServicePhase(ServicePhaseBase):
    id: int
    created_at: datetime
    updated_at: datetime

# Client Models
class ClientBase(BaseModel):
    name: str
    industry: Optional[str] = None
    size: Optional[int] = None  # number of employees
    annual_revenue: Optional[float] = None
    atoka_id: Optional[str] = None
    status: str  # 'prospect', 'active', 'former'

class ClientCreate(ClientBase):
    pass

class ClientUpdate(ClientBase):
    pass

class Client(ClientBase):
    id: int
    created_at: datetime
    updated_at: datetime

# Client Detail Models
class ClientDetailBase(BaseModel):
    client_id: int
    country: Optional[str] = None
    region: Optional[str] = None
    erp_system: Optional[str] = None
    cloud_status: Optional[str] = None
    security_level: Optional[str] = None
    data_source: Optional[str] = None  # 'ATOKA', 'DWH', 'MANUAL'

class ClientDetailCreate(ClientDetailBase):
    pass

class ClientDetailUpdate(ClientDetailBase):
    pass

class ClientDetail(ClientDetailBase):
    id: int
    created_at: datetime
    updated_at: datetime

# Client Project Models
class ClientProjectBase(BaseModel):
    client_id: int
    business_unit_id: int
    service_id: int
    name: Optional[str] = None
    status: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    description: Optional[str] = None
    success_story: Optional[bool] = False
    is_public: Optional[bool] = False

class ClientProjectCreate(ClientProjectBase):
    pass

class ClientProjectUpdate(ClientProjectBase):
    pass

class ClientProject(ClientProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime

# Service Recommendation Models
class ServiceRecommendationBase(BaseModel):
    client_id: int
    service_id: int
    business_unit_id: int
    matching_score: float
    recommendation_basis: Optional[str] = None
    created_by: Optional[str] = None

class ServiceRecommendationCreate(ServiceRecommendationBase):
    pass

class ServiceRecommendationUpdate(ServiceRecommendationBase):
    pass

class ServiceRecommendation(ServiceRecommendationBase):
    id: int
    created_at: datetime
    updated_at: datetime

async def fetch_all(query: str, *args):
    conn = await get_db_connection()
    rows = await conn.fetch(query, *args)
    await conn.close()
    return rows

async def fetch_one(query: str, *args):
    conn = await get_db_connection()
    row = await conn.fetchrow(query, *args)
    await conn.close()
    return row

async def execute(query: str, *args):
    conn = await get_db_connection()
    status = await conn.execute(query, *args)
    await conn.close()
    return status


@app.get("/business-units/", response_model=List[BusinessUnit])
async def get_business_units():
    query = "SELECT * FROM business_unit WHERE is_active = TRUE"
    rows = await fetch_all(query)
    return [dict(row) for row in rows]

@app.get("/business-units/{business_unit_id}", response_model=BusinessUnit)
async def get_business_unit(business_unit_id: int):
    query = "SELECT * FROM business_unit WHERE id = $1"
    row = await fetch_one(query, business_unit_id)
    if not row:
        raise HTTPException(status_code=404, detail="Business unit not found")
    return dict(row)

@app.post("/business-units/", response_model=BusinessUnit, status_code=201)
async def create_business_unit(business_unit: BusinessUnitCreate):
    query = """
    INSERT INTO business_unit (name, description, is_active)
    VALUES ($1, $2, $3)
    RETURNING *
    """
    row = await fetch_one(query, business_unit.name, business_unit.description, business_unit.is_active)
    return dict(row)


@app.put("/business-units/{business_unit_id}", response_model=BusinessUnit)
async def update_business_unit(business_unit_id: int, business_unit: BusinessUnitUpdate):
    query = """
    UPDATE business_unit
    SET name = $1, description = $2, is_active = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *
    """
    row = await fetch_one(
        query,
        business_unit.name,
        business_unit.description,
        business_unit.is_active,
        business_unit_id
    )
    if not row:
        raise HTTPException(status_code=404, detail="Business unit not found")
    return dict(row)


@app.delete("/business-units/{business_unit_id}", status_code=204)
async def delete_business_unit(business_unit_id: int):
    query = "DELETE FROM business_unit WHERE id = $1"
    status = await execute(query, business_unit_id)
    if status == "DELETE 0":
        raise HTTPException(status_code=404, detail="Business unit not found")
    return JSONResponse(status_code=204)


@app.get("/services/", response_model=List[Service])
async def get_services():
    query = "SELECT * FROM service WHERE is_active = TRUE"
    rows = await fetch_all(query)
    return [dict(row) for row in rows]

@app.get("/services/{service_id}", response_model=Service)
async def get_service(service_id: int):
    query = "SELECT * FROM service WHERE id = $1"
    row = await fetch_one(query, service_id)
    if not row:
        raise HTTPException(status_code=404, detail="Service not found")
    return dict(row)

@app.post("/services/", response_model=Service, status_code=201)
async def create_service(service: ServiceCreate):
    query = """
    INSERT INTO service (name, description, approach, keywords, is_active)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    """
    row = await fetch_one(
        query,
        service.name,
        service.description,
        service.approach,
        service.keywords,
        service.is_active
    )
    return dict(row)


@app.put("/services/{service_id}", response_model=Service)
async def update_service(service_id: int, service: ServiceUpdate):
    query = """
    UPDATE service
    SET name = $1, description = $2, approach = $3, keywords = $4, is_active = $5, updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    RETURNING *
    """
    row = await fetch_one(
        query,
        service.name,
        service.description,
        service.approach,
        service.keywords,
        service.is_active,
        service_id
    )
    if not row:
        raise HTTPException(status_code=404, detail="Service not found")
    return dict(row)


@app.delete("/services/{service_id}", status_code=204)
async def delete_service(service_id: int):
    query = "DELETE FROM service WHERE id = $1"
    status = await execute(query, service_id)
    if status == "DELETE 0":
        raise HTTPException(status_code=404, detail="Service not found")
    return JSONResponse(status_code=204)


@app.post("/business-units/{business_unit_id}/services/{service_id}", status_code=201)
async def associate_service_with_business_unit(business_unit_id: int, service_id: int):
    query = """
    INSERT INTO business_unit_service (business_unit_id, service_id)
    VALUES ($1, $2)
    """
    try:
        await execute(query, business_unit_id, service_id)
        return JSONResponse(status_code=201, content={"message": "Service associated with Business Unit"})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/business-units/{business_unit_id}/services/", response_model=List[Service])
async def get_services_for_business_unit(business_unit_id: int):
    query = """
    SELECT s.*
    FROM service s
    JOIN business_unit_service bus ON s.id = bus.service_id
    WHERE bus.business_unit_id = $1
    """
    rows = await fetch_all(query, business_unit_id)
    return [dict(row) for row in rows]


@app.delete("/business-units/{business_unit_id}/services/{service_id}", status_code=204)
async def remove_service_from_business_unit(business_unit_id: int, service_id: int):
    query = """
    DELETE FROM business_unit_service
    WHERE business_unit_id = $1 AND service_id = $2
    """
    status = await execute(query, business_unit_id, service_id)
    if status == "DELETE 0":
        raise HTTPException(status_code=404, detail="Association not found")
    return JSONResponse(status_code=204)



@app.get("/clients/", response_model=List[Client])
async def get_clients():
    query = "SELECT * FROM client"
    rows = await fetch_all(query)
    return [dict(row) for row in rows]


@app.get("/clients/{client_id}", response_model=Client)
async def get_client(client_id: int):
    query = "SELECT * FROM client WHERE id = $1"
    row = await fetch_one(query, client_id)
    if not row:
        raise HTTPException(status_code=404, detail="Client not found")
    return dict(row)


@app.post("/clients/", response_model=Client, status_code=201)
async def create_client(client: ClientCreate):
    query = """
    INSERT INTO client (name, industry, size, annual_revenue, atoka_id, status)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    """
    row = await fetch_one(
        query,
        client.name,
        client.industry,
        client.size,
        client.annual_revenue,
        client.atoka_id,
        client.status
    )
    return dict(row)



@app.put("/clients/{client_id}", response_model=Client)
async def update_client(client_id: int, client: ClientUpdate):
    query = """
    UPDATE client
    SET name = $1, industry = $2, size = $3, annual_revenue = $4, atoka_id = $5, status = $6, updated_at = CURRENT_TIMESTAMP
    WHERE id = $7
    RETURNING *
    """
    row = await fetch_one(
        query,
        client.name,
        client.industry,
        client.size,
        client.annual_revenue,
        client.atoka_id,
        client.status,
        client_id
    )
    if not row:
        raise HTTPException(status_code=404, detail="Client not found")
    return dict(row)


@app.delete("/clients/{client_id}", status_code=204)
async def delete_client(client_id: int):
    query = "DELETE FROM client WHERE id = $1"
    status = await execute(query, client_id)
    if status == "DELETE 0":
        raise HTTPException(status_code=404, detail="Client not found")
    return JSONResponse(status_code=204)


@app.get("/clients/{client_id}/details", response_model=ClientDetail)
async def get_client_details(client_id: int):
    query = "SELECT * FROM client_detail WHERE client_id = $1"
    row = await fetch_one(query, client_id)
    if not row:
        raise HTTPException(status_code=404, detail="Client details not found")
    return dict(row)



@app.put("/clients/{client_id}/details", response_model=ClientDetail)
async def upsert_client_details(client_id: int, details: ClientDetailCreate):
    # Check if client exists
    client = await fetch_one("SELECT * FROM client WHERE id = $1", client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    # Check if details exist
    existing = await fetch_one("SELECT * FROM client_detail WHERE client_id = $1", client_id)
    if existing:
        # Update
        query = """
        UPDATE client_detail
        SET country = $1, region = $2, erp_system = $3, cloud_status = $4, security_level = $5, data_source = $6, updated_at = CURRENT_TIMESTAMP
        WHERE client_id = $7
        RETURNING *
        """
        row = await fetch_one(
            query,
            details.country,
            details.region,
            details.erp_system,
            details.cloud_status,
            details.security_level,
            details.data_source,
            client_id
        )
    else:
        # Insert
        query = """
        INSERT INTO client_detail (client_id, country, region, erp_system, cloud_status, security_level, data_source)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        """
        row = await fetch_one(
            query,
            client_id,
            details.country,
            details.region,
            details.erp_system,
            details.cloud_status,
            details.security_level,
            details.data_source
        )
    return dict(row)


@app.delete("/clients/{client_id}/details", status_code=204)
async def delete_client_details(client_id: int):
    query = "DELETE FROM client_detail WHERE client_id = $1"
    status = await execute(query, client_id)
    if status == "DELETE 0":
        raise HTTPException(status_code=404, detail="Client details not found")
    return JSONResponse(status_code=204)


@app.get("/clients/{client_id}/projects/", response_model=List[ClientProject])
async def get_client_projects(client_id: int):
    query = "SELECT * FROM client_project WHERE client_id = $1"
    rows = await fetch_all(query, client_id)
    return [dict(row) for row in rows]


@app.post("/clients/{client_id}/projects/", response_model=ClientProject, status_code=201)
async def create_client_project(client_id: int, project: ClientProjectCreate):
    query = """
    INSERT INTO client_project (
        client_id, business_unit_id, service_id, name, status, start_date, end_date, description, success_story, is_public
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
    """
    row = await fetch_one(
        query,
        client_id,
        project.business_unit_id,
        project.service_id,
        project.name,
        project.status,
        project.start_date,
        project.end_date,
        project.description,
        project.success_story,
        project.is_public
    )
    return dict(row)


@app.put("/clients/{client_id}/projects/{project_id}", response_model=ClientProject)
async def update_client_project(client_id: int, project_id: int, project: ClientProjectUpdate):
    query = """
    UPDATE client_project
    SET business_unit_id = $1, service_id = $2, name = $3, status = $4,
        start_date = $5, end_date = $6, description = $7,
        success_story = $8, is_public = $9, updated_at = CURRENT_TIMESTAMP
    WHERE id = $10 AND client_id = $11
    RETURNING *
    """
    row = await fetch_one(
        query,
        project.business_unit_id,
        project.service_id,
        project.name,
        project.status,
        project.start_date,
        project.end_date,
        project.description,
        project.success_story,
        project.is_public,
        project_id,
        client_id
    )
    if not row:
        raise HTTPException(status_code=404, detail="Client project not found")
    return dict(row)



@app.delete("/clients/{client_id}/projects/{project_id}", status_code=204)
async def delete_client_project(client_id: int, project_id: int):
    query = "DELETE FROM client_project WHERE id = $1 AND client_id = $2"
    status = await execute(query, project_id, client_id)
    if status == "DELETE 0":
        raise HTTPException(status_code=404, detail="Client project not found")
    return JSONResponse(status_code=204)


@app.get("/clients/{client_id}/recommendations/", response_model=List[ServiceRecommendation])
async def get_service_recommendations(client_id: int):
    query = "SELECT * FROM service_recommendation WHERE client_id = $1"
    rows = await fetch_all(query, client_id)
    return [dict(row) for row in rows]


@app.post("/clients/{client_id}/recommendations/", response_model=ServiceRecommendation, status_code=201)
async def create_service_recommendation(client_id: int, recommendation: ServiceRecommendationCreate):
    query = """
    INSERT INTO service_recommendation (
        client_id, service_id, business_unit_id, matching_score, recommendation_basis, created_by
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    """
    row = await fetch_one(
        query,
        client_id,
        recommendation.service_id,
        recommendation.business_unit_id,
        recommendation.matching_score,
        recommendation.recommendation_basis,
        recommendation.created_by
    )
    return dict(row)


@app.put("/clients/{client_id}/recommendations/{recommendation_id}", response_model=ServiceRecommendation)
async def update_service_recommendation(client_id: int, recommendation_id: int, recommendation: ServiceRecommendationUpdate):
    query = """
    UPDATE service_recommendation
    SET service_id = $1, business_unit_id = $2, matching_score = $3,
        recommendation_basis = $4, created_by = $5, updated_at = CURRENT_TIMESTAMP
    WHERE id = $6 AND client_id = $7
    RETURNING *
    """
    row = await fetch_one(
        query,
        recommendation.service_id,
        recommendation.business_unit_id,
        recommendation.matching_score,
        recommendation.recommendation_basis,
        recommendation.created_by,
        recommendation_id,
        client_id
    )
    if not row:
        raise HTTPException(status_code=404, detail="Service recommendation not found")
    return dict(row)


@app.delete("/clients/{client_id}/recommendations/{recommendation_id}", status_code=204)
async def delete_service_recommendation(client_id: int, recommendation_id: int):
    query = "DELETE FROM service_recommendation WHERE id = $1 AND client_id = $2"
    status = await execute(query, recommendation_id, client_id)
    if status == "DELETE 0":
        raise HTTPException(status_code=404, detail="Service recommendation not found")
    return JSONResponse(status_code=204)


@app.get("/recommendations-view/", response_model=List[dict])
async def get_recommendations_view():
    query = "SELECT * FROM v_service_recommendations"
    rows = await fetch_all(query)
    return [dict(row) for row in rows]


@app.get("/success-stories-view/", response_model=List[dict])
async def get_success_stories_view():
    query = "SELECT * FROM v_success_stories"
    rows = await fetch_all(query)
    return [dict(row) for row in rows]

