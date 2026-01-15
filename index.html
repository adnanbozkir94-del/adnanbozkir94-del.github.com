<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Şiir Sitesi</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #b6e7b6; /* açık yeşil */
            color: black;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            background-color: #a3d9a3;
        }

        #search {
            padding: 8px;
            width: 200px;
            color: gray;
        }

        #openPoem {
            text-decoration: none;
            color: black;
            font-weight: bold;
        }

        .container {
            padding: 20px;
        }

        h2 {
            color: red; /* şiir başlığı */
        }

        .poem {
            margin-bottom: 25px;
            padding-bottom: 10px;
            border-bottom: 1px solid #555;
        }
    </style>
</head>
<body>

<header>
    <input type="text" id="search" placeholder="Şiir ara">
    <a href="#bugun" id="openPoem">Hemen şiiri aç</a>
</header>

<div class="container">
    <h1 id="bugun">📜 Bugünün Şiiri</h1>
    <div id="todayPoem"></div>

    <hr>

    <h1>Tüm Şiirler</h1>
    <div id="poemList"></div>
</div>

<script>
    const poems = [];

    for (let i = 1; i <= 50; i++) {
        poems.push({
            title: "Şiir " + i,
            text: "Bu şiir numara " + i + ".\nKalbimden dökülen dizeler,\nSessiz bir gecede saklı."
        });
    }

    const today = poems[Math.floor(Math.random() * poems.length)];

    document.getElementById("todayPoem").innerHTML = `
        <div class="poem">
            <h2>${today.title}</h2>
            <pre>${today.text}</pre>
        </div>
    `;

    const poemList = document.getElementById("poemList");

    function renderPoems(list) {
        poemList.innerHTML = "";
        list.forEach(p => {
            poemList.innerHTML += `
                <div class="poem">
                    <h2>${p.title}</h2>
                    <pre>${p.text}</pre>
                </div>
            `;
        });
    }

    renderPoems(poems);

    document.getElementById("search").addEventListener("input", function () {
        const value = this.value.toLowerCase();
        const filtered = poems.filter(p =>
            p.title.toLowerCase().includes(value) ||
            p.text.toLowerCase().includes(value)
        );
        renderPoems(filtered);
    });
</script>

</body>
</html>
