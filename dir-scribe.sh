#!/bin/bash
# dir-scribe: A script for poetically mapping directory landscapes

# ANSI color codes
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default variables
path="."
output_file="folder_structure.txt"
custom_gitignore=""

# Function to print usage
usage() {
    echo "Usage: $0 [-p path] [-o output_file] [-i gitignore_path]"
    echo "  -p : Path to generate structure from"
    echo "  -o : Output file path"
    echo "  -i : Custom .gitignore file path"
    exit 1
}

# Parse command line arguments
while getopts ":p:o:i:" opt; do
    case ${opt} in
        p ) path=$OPTARG ;;
        o ) output_file=$OPTARG ;;
        i ) custom_gitignore=$OPTARG ;;
        \? ) usage ;;
    esac
done

# Function to parse .gitignore file
parse_gitignore() {
    local gitignore_path="$1"
    local patterns=()
    
    while IFS= read -r line || [[ -n "$line" ]]; do
        # Remove leading/trailing whitespace
        line=$(echo "$line" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
        
        # Skip empty lines and comments
        [[ -z "$line" || "$line" == \#* ]] && continue
        
        # Remove comments at the end of lines
        line=$(echo "$line" | sed 's/#.*//')
        
        # Trim trailing whitespace
        line=$(echo "$line" | sed 's/[[:space:]]*$//')
        
        # Skip negation patterns for now
        [[ "$line" == \!* ]] && continue
        
        patterns+=("$line")
    done < "$gitignore_path"
    
    printf '%s\n' "${patterns[@]}"
}

# Function to convert gitignore pattern to regex
pattern_to_regex() {
    local pattern="$1"
    local regex
    
    # Handle special characters
    regex=$(echo "$pattern" | sed -e 's/[.]/\\&/g')  # Escape dots
    
    # Convert ** to regex
    regex=$(echo "$regex" | sed -e 's/\*\*/.*/')
    
    # Convert remaining * to non-slash regex
    regex=$(echo "$regex" | sed -e 's/\*/[^\/]*/')
    
    # Handle trailing slashes
    regex="${regex%/}"
    
    echo "$regex"
}

# Function to check if a path matches a gitignore pattern
matches_pattern() {
    local path="$1"
    local pattern="$2"
    local regex
    
    # Convert pattern to regex
    regex=$(pattern_to_regex "$pattern")
    
    # Check if path matches pattern
    [[ "$path" =~ $regex ]] || [[ "$path" =~ $regex/ ]]
}

# Function to check if a file/directory should be ignored
should_ignore() {
    local item="$1"
    local filename=$(basename "$item")
    local relative_path=${item#$path/}
    
    for pattern in "${GITIGNORE_PATTERNS[@]}"; do
        # Handle exact matches
        if matches_pattern "$relative_path" "$pattern" || matches_pattern "$filename" "$pattern"; then
            return 0
        fi
    done
    
    return 1
}

# Function to generate folder structure
generate_structure() {
    local dir="$1"
    local prefix="$2"
    local is_last_parent="$3"
    
    # Prepare files/dirs, sorting for consistent output
    local items
    IFS=$'\n' items=($(find "$dir" -maxdepth 1 -mindepth 1 | sort))
    
    # Track number of non-ignored items
    local valid_item_count=0
    
    # First pass: count valid items
    for item in "${items[@]}"; do
        if ! should_ignore "$item"; then
            ((valid_item_count++))
        fi
    done
    
    # Reset counter for second pass
    local current_item=0
    
    for item in "${items[@]}"; do
        # Skip ignored items
        if should_ignore "$item"; then
            continue
        fi
        
        ((current_item++))
        
        local filename=$(basename "$item")
        local is_last_item=$((current_item == valid_item_count))
        
        # Determine tree characters
        local tree_char="├── "
        local extend_char="│   "
        if [ "$is_last_item" -eq 1 ]; then
            tree_char="└── "
            extend_char="    "
        fi
        
        # Print item
        echo "${prefix}${tree_char}${filename}" | tee -a "$output_file"
        
        # Recursively process subdirectories
        if [ -d "$item" ]; then
            generate_structure "$item" "${prefix}${extend_char}" "$is_last_item"
        fi
    done
}

# Clear output file
> "$output_file"

# Use custom gitignore if specified, otherwise detect .gitignore in current directory
if [ -n "$custom_gitignore" ]; then
    if [ -f "$custom_gitignore" ]; then
        echo -e "${GREEN}✓ Using custom .gitignore: ${custom_gitignore}${NC}"
        gitignore_path="$custom_gitignore"
    else
        echo -e "${YELLOW}✗ Custom .gitignore not found: ${custom_gitignore}${NC}"
        exit 1
    fi
else
    gitignore_path=".gitignore"
    if [ -f "$gitignore_path" ]; then
        echo -e "${GREEN}✓ Using .gitignore from current directory${NC}"
    else
        echo -e "${YELLOW}✗ No .gitignore found${NC}"
        GITIGNORE_PATTERNS=()
    fi
fi

# Parse gitignore patterns if we found a gitignore
if [ -n "$gitignore_path" ]; then
    GITIGNORE_PATTERNS=($(parse_gitignore "$gitignore_path"))
    echo -e "${BLUE}Loaded ${#GITIGNORE_PATTERNS[@]} patterns from .gitignore${NC}"
fi

# Print path
echo -e "${GREEN}Path: ${path}${NC}"

# Add newline before structure
echo ""

# Print root directory name
echo "$(basename "$path")" | tee "$output_file"

# Generate full structure
generate_structure "$path" "" 1

# Add newline after structure
echo ""

# Print save location in blue
echo -e "${BLUE}Folder structure saved to $output_file${NC}"