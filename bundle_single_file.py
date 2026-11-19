with open('prototype/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('prototype/css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

with open('prototype/js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace css link
html = html.replace('<link rel="stylesheet" href="css/style.css">', f'<style>\n{css}\n</style>')

# Replace js script
html = html.replace('<script src="js/app.js"></script>', f'<script>\n{js}\n</script>')

with open('prototype/standalone.html', 'w', encoding='utf-8') as f:
    f.write(html)

with open('Smart_ICU_Dashboard_Single_File.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Generated Smart_ICU_Dashboard_Single_File.html successfully!')
