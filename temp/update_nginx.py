import re

path = "/etc/nginx/sites-enabled/ashgpt"
with open(path, "r") as f:
    text = f.read()

# Replace in location = /resume/ashish-gupta-resume.pdf
old_cd = "add_header Content-Disposition 'attachment; filename=\"Ashish-Gupta-Resume.pdf\"';"
new_cd = "add_header Content-Disposition 'attachment; filename=\"Ashish-Gupta-Resume.pdf\"' always;"
text = text.replace(old_cd, new_cd)

old_cc = 'add_header Cache-Control "no-cache";'
new_cc = 'add_header Cache-Control "no-cache" always;'
text = text.replace(old_cc, new_cc)

# Also ensure location = /resume has the header
old_res = "    location = /resume {\n        return 302 /resume/ashish-gupta-resume.pdf;\n    }"
new_res = "    location = /resume {\n        add_header Content-Disposition 'attachment; filename=\"Ashish-Gupta-Resume.pdf\"' always;\n        add_header Cache-Control \"no-cache\" always;\n        return 302 /resume/ashish-gupta-resume.pdf;\n    }"
text = text.replace(old_res, new_res)

with open(path, "w") as f:
    f.write(text)

print("Nginx ashgpt config updated successfully!")
