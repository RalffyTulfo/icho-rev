import re
import json

# Read the file
with open('src/content/problems/thermo-problems.json', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix invalid escape sequences
pattern = r'\\(?![\"\\/bfnrt]|u[0-9a-fA-F]{4})'
fixed_text = re.sub(pattern, r'\\\\', text)

# Parse the JSON
data = json.loads(fixed_text)

# Print the problem IDs
print("Successfully parsed!")
print("\nTop-level keys:")
for k, v in data.items():
    print(f"  {k}")
    if isinstance(v, dict):
        for subk, subv in v.items():
            print(f"    {subk}: {len(subv) if isinstance(subv, list) else type(subv)}")
            if isinstance(subv, list):
                for item in subv:
                    print(f"      - {item.get('id')}")