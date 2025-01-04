import os

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
