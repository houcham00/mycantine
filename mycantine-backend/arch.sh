#!/bin/bash

# Fichier de sortie
output_file="directory_structure.txt"

# Initialiser le fichier de sortie
echo "Structure du dossier et contenu des fichiers" > "$output_file"
echo "============================================" >> "$output_file"
echo "" >> "$output_file"

# Fonction pour afficher l'architecture et le contenu des fichiers
display_directory_structure() {
    # Parcourir récursivement les fichiers et dossiers en excluant certains types
    find . -type d -not -path '*/node_modules/*' -not -path '*/utils/*' -not -path '*/tests/*' -not -path '*/config/*' | while read dir; do
        echo "Dossier: $dir" >> "$output_file"
        # Lister les fichiers dans ce dossier en excluant les types spécifiés
        find "$dir" -maxdepth 1 -type f \
            -not -name '*.json' \
            -not -name '.env' \
            -not -name '*.md' \
            -not -path '*/node_modules/*' \
            -not -path '*/utils/*' \
            -not -path '*/tests/*' \
            -not -path '*/config/*' | while read file; do
            echo "  Fichier: $file" >> "$output_file"
            # Afficher le contenu du fichier
            cat "$file" >> "$output_file"
            echo -e "\n-----------------------------\n" >> "$output_file"
        done
    done
}

# Appeler la fonction
display_directory_structure

echo "Processus terminé. Les informations ont été stockées dans $output_file."
