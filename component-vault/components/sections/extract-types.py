#!/usr/bin/env python3
import re
import os

components = [
    'BenefitsSection',
    'PricingSection',
    'RoadmapSection',
    'TestimonialsSection',
    'ClientLogosSection',
    'ContactSection',
    'Footer'
]

for comp in components:
    tsx_file = f"{comp}/{comp}.tsx"
    types_file = f"{comp}/{comp}.types.ts"
    
    if not os.path.exists(tsx_file):
        print(f"Skipping {comp} - file not found")
        continue
    
    with open(tsx_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract all interfaces
    interface_pattern = r'export interface \w+.*?\{[^}]*\}'
    interfaces = re.findall(interface_pattern, content, re.DOTALL)
    
    if interfaces:
        # Create types file
        types_content = "import React from 'react';\n\n"
        for interface in interfaces:
            types_content += interface + '\n\n'
        
        with open(types_file, 'w', encoding='utf-8') as f:
            f.write(types_content)
        
        print(f"✓ Created {types_file}")
    else:
        print(f"⚠ No interfaces found in {comp}")

print("\nTypes extraction complete!")
