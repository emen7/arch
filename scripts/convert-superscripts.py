import re
import sys

# Map superscript Unicode to regular numbers
superscript_map = {
    '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
    '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9'
}

def convert_superscript_to_number(sup_text):
    """Convert superscript Unicode characters to regular numbers"""
    result = ''
    for char in sup_text:
        result += superscript_map.get(char, char)
    return result

def replace_sup_tags(content):
    """Replace <sup>X</sup> with <Citation num={X} />"""
    def replacer(match):
        sup_content = match.group(1)
        # Convert superscript Unicode to numbers
        number_str = convert_superscript_to_number(sup_content)
        return f'<Citation num={{{number_str}}} />'

    # Match <sup>...</sup> tags
    pattern = r'<sup>([^<]+)</sup>'
    return re.sub(pattern, replacer, content)

def main():
    if len(sys.argv) != 2:
        print("Usage: python convert-superscripts.py <file_path>")
        sys.exit(1)

    file_path = sys.argv[1]

    # Read file
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace sup tags
    new_content = replace_sup_tags(content)

    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"Converted superscripts in {file_path}")

if __name__ == '__main__':
    main()
