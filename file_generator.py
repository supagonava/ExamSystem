import os

if __name__ == "__main__":
    msg_path = "ai.txt"
    if os.path.exists(msg_path):
        content = open(msg_path, "r", encoding="utf-8").read()
        # Handle both file creations and deletions
        operations = [c for c in content.split("//") if c.strip().startswith(("File:", "Delete:"))]

        for operation in operations:
            operation = operation.strip()
            if operation.startswith("File:"):
                # Handle file creation
                lines = operation[5:].split("\n")
                file_name = lines[0].strip()
                file_content = "\n".join(lines[1:])
                os.makedirs(os.path.dirname(file_name), exist_ok=True)
                with open(file_name, "w", encoding="utf-8") as f:
                    f.write(file_content)
            elif operation.startswith("Delete:"):
                # Handle file deletion
                file_name = operation[7:].strip()
                if os.path.exists(file_name):
                    os.remove(file_name)
