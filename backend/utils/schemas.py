def individual_serial(epic_db):
    return {
        "id": str(epic_db["_id"]),
        "username": str(epic_db["username"]),
        "hashed_password": epic_db["hashed_password"],
    }

def list_serial(epic_db):
    return [individual_serial(db) for db in epic_db]