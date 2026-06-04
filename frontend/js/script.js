const API_URL = "http://localhost:3000/negocios";

const form = document.getElementById("formNegocio");
const listaNegocios = document.getElementById("listaNegocios");

/* ÍCONE POR CATEGORIA */

function criarIcone(categoria){

    categoria = categoria.toLowerCase();

    if(categoria.includes("aliment"))
        return "🍔";

    if(categoria.includes("rest"))
        return "🍕";

    if(categoria.includes("beleza"))
        return "💄";

    if(categoria.includes("academ"))
        return "🏋️";

    if(categoria.includes("serv"))
        return "🛠️";

    if(categoria.includes("merc"))
        return "🛒";

    return "🏪";
}

/* LISTAR NEGÓCIOS */

async function carregarNegocios(){

    try{

        const resposta = await fetch(API_URL);

        const negocios = await resposta.json();

        listaNegocios.innerHTML = "";

        negocios.forEach(negocio => {

            listaNegocios.innerHTML += `

            <div class="card">

                <div class="card-header">

                    <div class="card-icon">
                        ${criarIcone(negocio.categoria)}
                    </div>

                    <span class="badge">
                        ${negocio.categoria}
                    </span>

                </div>

                <h3>
                    ${negocio.nome}
                </h3>

                <div class="card-info">

                    <p>
                        🔥 ${negocio.promocao || "Sem promoção"}
                    </p>

                    <p>
                        📅 ${negocio.evento || "Sem evento"}
                    </p>

                    <p>
                        🚚 ${negocio.servico || "Sem serviço"}
                    </p>

                </div>

                <div class="card-actions">

                    <button
                        class="btn-editar"
                        onclick="editarNegocio(${negocio.id})">

                        Editar

                    </button>

                    <button
                        class="btn-excluir"
                        onclick="excluirNegocio(${negocio.id})">

                        Excluir

                    </button>

                </div>

            </div>

            `;
        });

    }

    catch(error){

        console.error(
            "Erro ao carregar negócios:",
            error
        );
    }
}

/* CADASTRAR */

form.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const novoNegocio = {

        nome:
        document.getElementById("nome").value,

        categoria:
        document.getElementById("categoria").value,

        promocao:
        document.getElementById("promocao").value,

        evento:
        document.getElementById("evento").value,

        servico:
        document.getElementById("servico").value
    };

    try{

        await fetch(API_URL, {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(
                novoNegocio
            )
        });

        form.reset();

        carregarNegocios();

    }

    catch(error){

        console.error(
            "Erro ao cadastrar:",
            error
        );
    }
});

/* EXCLUIR */

async function excluirNegocio(id){

    const confirmar = confirm(
        "Deseja realmente excluir este negócio?"
    );

    if(!confirmar)
        return;

    try{

        await fetch(`${API_URL}/${id}`, {

            method:"DELETE"
        });

        carregarNegocios();

    }

    catch(error){

        console.error(
            "Erro ao excluir:",
            error
        );
    }
}

/* EDITAR */

async function editarNegocio(id){

    const novoNome = prompt(
        "Digite o novo nome do negócio:"
    );

    if(!novoNome)
        return;

    try{

        await fetch(`${API_URL}/${id}`, {

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                nome:novoNome
            })
        });

        carregarNegocios();

    }

    catch(error){

        console.error(
            "Erro ao atualizar:",
            error
        );
    }
}

/* INICIAR */

carregarNegocios();