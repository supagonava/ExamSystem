import os


def generate_project_structure(root_dir, ignore_patterns=None):
    if ignore_patterns is None:
        ignore_patterns = [".git", "__pycache__", "venv", "node_modules"]

    structure = []

    def should_ignore(path):
        return any(pattern in path for pattern in ignore_patterns)

    def build_structure(dir_path, level=0):
        if should_ignore(dir_path):
            return

        items = os.listdir(dir_path)
        items.sort()

        for item in items:
            full_path = os.path.join(dir_path, item)
            if should_ignore(full_path):
                continue

            indent = "  " * level
            if os.path.isfile(full_path):
                structure.append(f"{indent}- {item}")
            else:
                structure.append(f"{indent}- {item}/")
                build_structure(full_path, level + 1)

    build_structure(root_dir)
    return "\n".join(["# Project Structure", "```", *structure, "```"])


if __name__ == "__main__":
    msg_path = "ai.txt"
    if os.path.exists(msg_path):
        content = open(msg_path, "r", encoding="utf-8").read()
        files_content = [c for c in content.split("// File: ") if c != ""]
        # print(files_content)
        for file_content in files_content:
            lines = file_content.split("\n")
            file_name = lines[0]
            file_content = "\n".join(lines[1:])
            os.makedirs(os.path.dirname(file_name), exist_ok=True)
            with open(file_name, "w", encoding="utf-8") as f:
                f.write(file_content)

    # Generate project structure
    src_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src")
    if os.path.exists(src_dir):
        structure_content = generate_project_structure(src_dir)
        with open("project-structure.md", "w", encoding="utf-8") as f:
            f.write(structure_content)
