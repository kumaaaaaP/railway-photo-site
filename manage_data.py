import json
import os

DATA_FILE = 'data/train_data.json'

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"companies": []}

def save_data(data):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def validate_data():
    data = load_data()
    # 基本的な構造チェック
    if "companies" not in data:
        print("Error: 'companies' key missing")
        return False
    
    for company in data["companies"]:
        if not all(k in company for k in ("id", "name", "train_types")):
            print(f"Error: Invalid company structure for {company.get('name', 'unknown')}")
            return False
            
    print("Data validation successful!")
    return True

if __name__ == "__main__":
    validate_data()
