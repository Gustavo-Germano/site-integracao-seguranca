const API_URL = 'https://site-integracao-seguranca.onrender.com';

const modulos = [
  {
    titulo: "1. Ao recebedor deste:",
    audio: "audios/modulo1.mp3",
    texto: `<p> 
    A partir de agora você passa a fazer parte de nossa equipe de  colaboradores, saiba da nossa enorme satisfação em entregar a você  este manual.  
Elaboramos este manual no intuito de proporcionar a você meios para  auxiliá-lo a evitar e a se proteger contra acidentes e ao mesmo tempo  estabelecer uma disciplina de segurança, 
da qual deve resultar em um  ambiente onde todos possam desenvolver suas atividades profissionais  em harmonia e tranquilidade, condições essas, 
essenciais para o seu  bem estar no trabalho.  Lembramos a você que nossa empresa possue áreas de riscos em suas  instalações, 
desta maneira a correta observação dos procedimentos  aqui descritos deverá ser uma meta diária no seu trabalho.  
Lembre-se!  ''O sábio antevê o perigo e protege-se, mas os imprudentes passam e  sofrem as consequências'' (provérbios 2,2:3). 

</p>

<h2><strong>Bom trabalho!</strong></h2>

`

  },
  
  {
    titulo: "2. Segurança do Trabalho",
    audio: "audios/modulo2.mp3",
    texto: `
    <p> Segurança do trabalho pode ser entendida como o conjunto de medidas que são adotadas visando minimizar os acidentes de trabalho, doenças ocupacionais, 
bem como proteger a integridade e a capacidade de trabalho do trabalhador. Este processo envolve, a análise e o controle das condições de trabalho na empresa, as 
quais constituem as variáveis que influenciam decisivamente o comportamento humano. É a atuação do colaborador quando se depara com alguma situação de risco capaz 
de provocar um acidente, inerente à atividade laboral desenvolvida. Todos os colaboradores devem atentar para a observância das normas de segurança e medicina do trabalho, 
orientando ou procurando orientação, quando na execução de atividade em que haja possibilidade de eventuais acidentes. Ainda comunicar ao superior hierárquico os perigos 
detectados, com o objetivo de demonstrar que as ações se deram com a cautela necessária e que não houve omissão no cumprimento do dever profissional. </p>

        <h2>ACIDENTES</h2>
    
<p> <strong>Acidente do trabalho:</strong> É aquele que ocorre pelo exercíciodo trabalho, a serviço da empresa, provocando lesãocorporal ou perturbação funcional que cause a 
morte, aperda ou redução, permanente ou temporária, da capacidadepara o trabalho. </p>
    
<p> <strong>Acidente de trajeto:</strong> É uma interpretação da lei que equipara a acidente do trabalho o acidente ocorrido pelo empregado no trajeto da residência para o trabalho 
ou deste para aquele. As causas mais freqüentes de acidentes são a falta de atenção, a falta de experiência e a inobservância as normas de segurança no trabalho. </p>
    `
  },
  
  {
    titulo: "3. Atos e Condições Inseguras",
    
    partes: [
        {
            titulo: "3.1 Atos e Condições Inseguras",
            audio: "audios/modulo3-1.mp3",
            texto: `

    <p> <strong>Ato Inseguro:</strong> É o ato praticado pelo colaborador, em geral, consciente de que está fazendo algo contra as normas
de segurança da empresa. </p> 

    <div class="imagens-lado-a-lado">
        <img src="img/atoInseguro.png">
        <img src="img/atoInseguro2.jpg">
    </div>

    <h3>Exemplos:</h3>
    
    <p> ▪️Não usar os equipamentos de proteção individual obrigatórios; </p>
    <p> ▪️Não obedecer a sinalização de segurança; </p>
    <p> ▪️Realizar armazenamento inadequado; </p>
    <p> ▪️Brincadeiras, correrias, etc. </p>

    <p> <strong>Condição Insegura:</strong> É a condição do ambiente de trabalho que oferece perigo e/ou risco ao trabalhador. </p>
    
    <div class="imagens-lado-a-lado">
        <img src="img/atoInseguro3.png">
        <img src="img/atoInseguro4.png">
    </div>

    <h3>Exemplos:</h3>
   
    <p> ▪️Máquinas em estado precário de manutenção;</p>
    <p> ▪️Falta de proteção em máquinas e equipamentos;</p>
    <p> ▪️Falta de Sinalização de segurança;</p>
    <p> ▪️Bagunça, sujeira e etc.</p>

    `
        },

        {
            titulo: "3.2 Atos e Condições Inseguras",
            audio: "audios/modulo3-2.mp3",
            texto: `
    <p> Não Efetue a limpeza, lubrificação ou regulagem, com a máquina em movimento. Desligue a maquina antes de executar qualquer serviço e chame a pessoa responsável, 
    mesmo que isso venha acarretar</p>

            <img src="img/atoInseguro5.jpg" class="imagem-centralizada">

    <p>As roupas folgadas, os anéis, relógios, etc, são extremamente perigosos, para quem trabalha em máquinas, pois podem enroscar em qualquer saliência e com isso levá-lo 
    a movimentos bruscos ou ser arrastado contra a máquina. </p>
            
            <img src="img/atoInseguro6.jpg" class="imagem-centralizada">

    <p> A cortesia e o respeito, contribuem para o bom andamento do serviço e proteção de acidentes. As brincadeiras, durante o trabalho, são muito perigosas, pois podem 
    provocar acidentes graves, além de brigas e discussões entre colegas. Portanto, evite as brincadeiras no ambiente de trabalho.</p>

            <img src="img/atoInseguro7.jpg" class="imagem-centralizada">

    <p> Não corra nas dependências da fabrica, nas escadas segure sempre nos corrimãos, não pule degraus ou corra sobre os mesmos.</p>

            <img src="img/atoInseguro8.png" class="imagem-centralizada">

    `
        },

        {
            titulo: "3.3 Atos e Condições Inseguras",
            audio: "audios/modulo3-3.mp3",
            texto: `
    <p> Algumas áreas da empresa são consideradas áreas de risco (cabines elétricas, depósito de produtos químicos, etc...), SÓ PODENDO NELAS ENTRAR PESSOAS AUTORIZADAS. 
    Caso você não seja autorizado, não entre nessas áreas, pois além de estar incorrendo em risco físico, também estará cometendo uma falta grave. Caso você seja autorizado, 
    siga corretamente as normas de segurança e orientação da chefia. </p>

    <img src="img/atoInseguro9.png" class="imagem-centralizada">

    <h2> <strong>LEVANTAMENTO E TRANSPORTE DE CARGAS:</strong> </h2>

    <p> O levantamento e transporte de cargas exige precauções, pois na maioria das vezes os acidentes acontecem quando não são tomados os cuidados necessários. </p>

    <h3>Antes de levantar e transportar uma carga verificar:</h3>

    <p> ▪️Qual equipamento será utilizado para levantar e para transportar a carga; </p>
    <p> ▪️Os equipamentos foram vistoriados e liberados para a realização da tarefa, pelo responsável pela realização da mesma; </p>
    <p> ▪️Os equipamentos que serão utilizados para o levantamento e transporte suportam o peso da carga; </p>
    <p> ▪️Quais serão os procedimentos de segurança adotados para a realização do levantamento e transporte da carga; </p>
    <p> ▪️Que tipo de material será transportado? O mesmo possui pontas, rebarbas, etc?; </p>
    `
        },

        {
            titulo: "3.4 Atos e Condições Inseguras",
            audio: "audios/modulo3-4.mp3",
            texto: `
                
            <img src="img/atoInseguro10.png" class="imagem-lateral">

            <p>▪️O caminho a ser percorrido está impedido?; </p>
            <p>▪️Será necessário a utilização de EPIs?; </p>
            <p>▪️Só inicie quando não restar nenhuma dúvida quanto ao serviço que será executado</p>


            <h3> Se o levantamento for manual, este deve seguir a sequência abaixo:</h3>

              <img src="img/atoInseguro11.png" class="imagem-lateral imagem-ajuste-1">

            <p>▪️Posicione-se próximo à carga com os pés abertos para manter o equilíbrio; </p> 
            <p>▪️Abaixe-se e mantenha a cabeça e as costas em linha reta; </p>
            <p>▪️Segure firmemente a carga usando a palma das mãos e os dedos; </p>
            <p>▪️Sempre utilizar alças ou outros pontos de agarre caso o objeto os tenha; </p>


            <h2> <strong>⚠️ATENÇÃO PARA A PARTE PRINCIPAL⚠️</strong></h2>

            <img src="img/atoInseguro12.png" class="imagem-lateral imagem-ajuste-2">

            <p>▪️Levante-se usando somente as pernas e mantendo os braços esticados, sustentando a carga;</p>
            <p>▪️Aproxime a carga do corpo, mantendo-a centralizada (isso pode ser feito pela sua base ou pelas alças);</p>
            <p>▪️Agora é possível transporta-la de forma segura.</p> 
            
            <img src="img/atoInseguro13.png" class="imagem-lateral imagem-levantamento">

            <h2> <strong>⚠️O QUE NÃO SE DEVE FAZER⚠️</strong></h2>

            <img src="img/atoInseguro14.png" class="imagem-lateral imagem-ajuste-2">

            <p>▪️Dobrar as costas;</p>
            <p>▪️Ficar muito longe da carga;</p>
            <p>▪️Manter as pernas fixas no chão e virar o corpo com a carga;</p>
            <p>▪️Escorar a carga nas pernas ou nos joelhos.</p>

            `
        }
    ]
},

{
    titulo: "4. Ferramentas manuais",
    audio: "audios/modulo4.mp3",
    texto: `
    <p> Podemos considerar as ferramentas manuais como um prolongamento das mãos do trabalhador, dando-lhe mais força e precisão, trabalhar com ferramentas manuais 
defeituosas constitui em riscos de acidentes. Ferramentas gastas ou mal fixadas podem escapar e causar sérios acidentes, use as ferramentas adequadas para cada tipo de trabalho, 
ferramentas “quebra galho” poderão “quebrar você”. As ferramentas manuais que não puderem ser consertadas deverão ser substituidas. </p>
<p><strong>Lembre-se:</strong> Os bolsos não são locais adequados para se colocar ferramentas, as mesmas devem permanecer limpas e em locais adequados. </p>
    
    `
  },
  {
    titulo: "5. Ordem e limpeza",
    audio: "audios/modulo5.mp3",
    texto: `
    <p> Esses conceitos não são novos. Todavia ainda não foram assimilados em alguns locais de trabalho. Há quem pense que a ordem e a limpeza no ambiente de trabalho, 
são responsabilidade apenas da equipe de limpeza, quando na realidade esta responsabilidade pertence a todos.</p> 

    <p>Seu setor de trabalho deve ser permanecer limpo e organizado, de modo que cada equipamento ou ferramenta de trabalho esteja no seu devido lugar, não haja sujeiras e nem 
materiais espalhados.</p>
    
    <p> A falta da ordem e limpeza cria com frequência problemas que afetam à produtividade e a eficácia das operações, contribuem para o relaxamento dos hábitos de higiene pessoal e 
aumenta a propensão à doenças profissionais e acidentes do trabalho. Com as simples recomendações abaixo, você poderá conseguir facilmente esse
objetivo: </p>

    <p><strong>EVITE DERRAMAR MATERIAIS:</strong> Quando isso ocorrer, recolha-os tão logo quanto possível. Pregos, parafusos, ou outros pequenos objetos difíceis de serem
percebidos podem causar graves quedas.</p>

    <p> <strong>DEIXE AS PASSAGENS LIVRES:</strong> Sempre verifique se os corredores, as plataformas, escadas e/ou outros locais de passagens estão livres de materiais que
possam provocar tropeções ou quedas.</p>

    <p> <strong>REMOVA O LIXO E SUCATA:</strong> Deposite sempre esses materiais em locais e recipientes apropriados, a fim de que possam ser removidos facilmente, lembrando sempre, que devemos manter cada material 
no seu lugar e ter um lugar para cada material.</p>
    
    <p><strong>ORGANIZE-SE:</strong>  Mantenha as suas ferramentas, após serem limpas em locais apropriados e seguros, sempre que não estiverem em uso. </p>

    
    <img src="img/atoInseguro15.jpg" class="imagem-centralizada">

    
    `
  },
  {
    titulo: "6. Sinalização",
    audio: "audios/modulo6.mp3",
    texto: `
    <p> Siga corretamente os procedimentos indicados nos avisos e nas placas
orientativas existentes na empresa, pois essas indicam a
obrigatoriedade do uso de EPI's ou dos cuidados que deverão ser
tomados na execução de uma determinada tarefa ou procedimento.
Nunca retire ou danifique as placas de aviso
e/ou sinalizações de segurança, que não
estejam sob sua responsabilidade. </p>

    <img src="img/Sinalizacao.png" class="imagem-centralizada">
    
    `
    
},
  {
    titulo: "7. Higiene pessoal",
    audio: "audios/modulo7.mp3",
    texto: `
    <p>A higiene pessoal é o conjunto de hábitos de limpeza e asseio com que
cuidamos do nosso corpo. É um importante meio de comunicação para
um relacionamento saudável com outros, por exemplo, se estivermos á
beira de uma pessoa com odor corporal fétido temos tendência a
afastarmo-nos, mediante tal devemos ter uma boa higiene pessoal.
Dentre as normas para uma boa higiene pessoal destacam-se as
seguintes: </p>

    <p>▪️ No banho diário devemos utilizar um sabonete neutro.</p>

    <p>▪️ O uso de desodorizante é bastante útil, especialmente de Verão. No
entanto devem ser evitados os que inibem a produção do suor, podendo
assim acumular a transpiração noutros locais do corpo – transpiração
compensatória. Devemos lavar as mãos sempre que necessário,
especialmente antes das refeições, antes do contato com os alimentos e
depois de utilizar o banheiro. Alem disso, é importante manter as unhas
bem cortadas.</p>

    <p>▪️ Os dentes e a boca devem ser lavados depois da ingestão de
alimentos, usando um dentifrício com flúor. Uma higiene inadequada dos
dentes está na origem da carie dentaria, que pode ser causa de
inúmeras doenças.</p>

    
    `
  },
  {
    titulo: "8. Uso do fumo",
    audio: "audios/modulo8.mp3",
    texto: `
    <p> Mais que o fato de proibir ou limitar a
possibilidade do consumo de cigarro no
ambiente de trabalho, esta a preocupação, o
cuidado e a prevenção da saúde do
trabalhador por parte da empresa.</p>

    <img src="img/Usodofumo.png" class="imagem-centralizada">

    <p>Derivado de tabaco ou não do tabaco, em recinto
coletivo , privado ou público, salvo em área
destinada exclusivamente a esse fim,
devidamente isolada e com arejamento
conveniente. Desta forma, o uso do fumo deverá
A legislação, através da Lei 9.294/96, proibe o uso de cigarros,
cigarrilhas, charutos, cachimbos ou qualquer outro produto fumigero,
ser feito somente na área de fumantes, previamente estabelecida,
observe a sinalização. Você deve estar ciente de que fumar em local
proibido constitui falta grave.</p>

    <img src="img/Usodofumo1.png" class="imagem-centralizada">
    
    `
},
  {
    titulo: "9. CIPA",
    audio: "audios/modulo9.mp3",
    texto: `
    <p> A CIPA – (Comissão Interna de Prevenção de Acidentes), é composta
por representantes do empregador e dos empregados, e tem como
missão a preservação da saúde e da
integridade física dos trabalhadores e de
todos aqueles que interagem com a empresa.
Atua ainda na prevenção de acidentes, na
fiscalização quanto ao cumprimento das estabelecidas, bem como descobrir as 
causas e efeitos dos acidentes, desenvolvendo normas, orientações técnicas, 
treinamentos, etc, para evitá-los.</p>
    <p>Procure um membro da CIPA, para comunicar, qualquer irregularidade
que possa colocar você ou seus companheiros em risco de acidentes.</p>

    <img src="img/cipa.png" class="imagem-centralizada">

    
    `
  },
  {
    titulo: "10. EPI",
    audio: "audios/modulo10.mp3",
    texto: `
    <h2>EQUIPAMENTO DE PROTEÇÃO INDIVIDUAL (EPI)</h2>

    <p>O EPI é um dispositivo destinado a proteger a integridade física do
trabalhador, quando a proteção coletiva não eliminar completamente o
risco.</p>
    <p>A empresa é obrigada a fornecer aos empregados, gratuitamente, EPI
adequado ao risco, em perfeito estado de conservação e
funcionamento, nas seguintes circunstâncias:</p>
    <p>a) sempre que as medidas de ordem geral não ofereçam completa
proteção contra os riscos de acidentes do trabalho ou de doenças
profissionais e do trabalho;</p>
    <p>b) enquanto as medidas de proteção coletiva estiverem sendo
implantadas;</p>
    <p>c) para atender a situações de emergência.</p>

    <h3>Cabe ao empregador quanto ao EPI:</h3>

    <p>a) adquirir o adequado ao risco de cada atividade;</p>
    <p>b) exigir seu uso;</p>
    <p>c) fornecer ao trabalhador somente o aprovado pelo órgão nacional
   competente em matéria de segurança e saúde no trabalho;</p>
    <p>d) orientar e treinar o trabalhador sobre o uso adequado, guarda e
conservação;</p>
    <p>e) substituir imediatamente, quando danificado ou extraviado;</p>
    <p>f) responsabilizar-se pela higienização e manutenção periódica;</p>
    <p>g) comunicar ao MTE qualquer irregularidade observada;</p>
    <p>h) registrar o seu fornecimento ao trabalhador, podendo ser adotados
livros, fichas ou sistema eletrônico.</p>
    <h3>Cabe ao empregado quanto ao EPI:</h3>
    <p>a) usar, utilizando-o apenas para a finalidade a que se destina;</p>
    <p>b) responsabilizar-se pela guarda e conservação;</p>
    <p>c) comunicar ao empregador qualquer alteração que o torne impróprio
para uso;</p>
    <p>d) cumprir as determinações do empregador sobre o uso adequado.</p>

    <p>É importante resaltar que o uso do EPI é obrigatório e de muita
importância como meio de proteção à saúde e integridade física. O não
uso do EPI (caso o trabalhador se omitir ou recusar, sem justificativa),
fornecido pela empresa, poderá ser considerado como falta grave,
passivel de punição prevista em lei.</p>

    <p>Os acidentes/lesões podem ser eliminados ou amenizados, se você
utilizar todos os equipamentos de proteção individual (EPIs)
recomendados, conforme seu trabalho e/ou setor, tais como: calçados
de proteção, óculos de segurança, protetor auricular, luvas, aventais,
etc. Quando surgir duvidas a respeito do seu uso, manuseio,
conservação e limpeza seu encarregado deve ser consultado para
esclarecer suas duvidas. Vamos demostrar a seguir os EPIs mais
importantes.</p>
    
    `
  },
 
  {

    titulo: "11. Proteção dos olhos, da face e da audição",

    partes: [
        {
        
            titulo: "11.1. Proteção dos olhos e da face",
            audio: "audios/modulo11-1.mp3",
            texto: `
    
    <img src="img/olhoseface.png" class="imagem-lateral imagem-ajuste-3">


    <p>Todo ambiente que oferece riscos de quebra
e arremesso de materiais ou que apresenta
riscos químicos, físicos e biológicos, exige a
utilização de proteção adequada ao risco. Os
olhos e a face são, geralmente, muito
atingidos em acidentes de trabalho. A
utilização correta dos óculos, protetores
faciais e mascaras de solda, é a forma
mais segura de se evitar danos visuais. Fique atento para os seguintes tipos
de riscos: </p>


<img src="img/olhoseface1.png" class="imagem-lateral imagem-ajuste-3">

    <p><strong>Impactos:</strong> Objetos voadores, lascas diversas, fragmentos e partículas
são perigos, pois podem atingir os olhos na realização de tarefas
comuns;</p>

    <p><strong>Químicos:</strong> Respingos, fumos e vapores de
substâncias químicas, podem levar a cegueira
parcial e/ou total;</p>

    <p><strong>Radiação Ótica:</strong> A emissão de radiação e luz
intensa, através da exposição a fornos, soldas,
maçaricos, etc, deve ser combatida com a
utilização de óculos de segurança, protetores
faciais e/ou mascaras de solda.</p>

        <h2>PROTEÇÃO AUDITIVA</h2>


    <img src="img/auditiva.png" class="imagem-lateral imagem-ajuste-3">

    <p><strong>Ruído:</strong> O ruído é prejudicial à saúde humana
porque causa sensação desagradável e
irritante, causando efeitos tanto no trabalho
como no organismo</p>

    <p><strong>Efeitos no Trabalho:</strong> Problemas de comunicação, baixa concentração,
desconforto, cansaço, nervosismo, irritação, baixo rendimento e perda
de reflexos.</p>

    <p><strong>Efeitos no Organismo:</strong> Estreitamento dos vasos sangüíneos, aumento
da pressão arterial, ansiedade, tensão, insônia, problemas digestivos
(úlcera, gastrite) e problemas cardíacos.</p>

        <h2>EFEITOS DO RUÍDO NA AUDIÇÃO</h2>

<p><strong>Trauma Acústico:</strong> É a perda auditiva repentina causada por ruídos de
impacto. Exemplo: Explosões de dinamites, bombas e rojões.</p>

<p><strong>Perda Auditiva Temporária:</strong> Ocorre após exposição a ruído intenso,
mesmo por curto período de tempo. A audição volta ao normal após
algum tempo longe do ruído. Exemplo: Discoteca e Trio Elétrico.</p>

<p><strong>Perda Auditiva Permanente:</strong> Ocorre pela exposição repetida, durante
longos períodos, a ruídos de alta intensidade.É irreversível, pois
destrói as células auditivas. Exemplo: Trabalho em ambiente ruidoso.</p>
        `

        },

        {
            titulo: "11.2. Uso dos protetores",
            audio: "audios/modulo11-2.mp3",
            texto: `

            <h2>Colocando o protetor tipo Inserção (Plug)</h2>

            <img src="img/protetorPlug.png" class="imagem-lateral imagem-ajuste-3">
    
    <p><strong>1:</strong> Com as mãos limpas, pegue na haste do protetor e o direcione até a entrada do canal
auditivo.</p>

    <p><strong>2:</strong> Para facilitar a colocação, puxe a orelha
para cima e para o lado e coloque o protetor no
canal auditivo.</p>

    <p><strong>3:</strong> Após ser colocado o protetor deve ser
tirado apenas em locais livres de ruído.</p>

            <h2>COLOCANDO PROTETOR TIPO CONCHA</h2>

            <img src="img/protetorConcha.png" class="imagem-lateral imagem-ajuste-3">

    <p><strong>1:</strong> Alinhe as conchas de modo que elas cubram
completamente o ouvido.</p>

    <p><strong>2:</strong>Retire o excesso de cabelo que fique entre o abafador e o ouvido.</p>

    <p><strong>3:</strong> Certifique-se de que a vedação é satisfatória, sem a interferência de objetos 
como elástico de respiradores ou armação de óculos, de modo a obter melhor desempenho. </p>

            <h2>PROTEÇÃO RESPIRATÓRIA</h2>

            <img src="img/protetorRespiratorio.png" class="imagem-lateral imagem-ajuste-3">

    <p>O uso de respiradores requer difusão de
informações básicas entre os trabalhadores.
Saber para qual tipo de risco que o
respirador que você esta usando é indicado
é muito importante. Por isso observe se:</p>

    <p><strong>a)</strong> O respirador que você esta utilizando para poeira, serve para
manipular produtos químicos?;</p>

    <p><strong>b)</strong>  Ele é ideal para entrada em espaços confinados?;
</p>

    <p><strong>c)</strong> Eu estou fazendo a troca no período indicado?;</p>

    <p><strong>d)</strong> Recebi treinamento adequado para a utilização do respirador?;</p>

    <p><strong>e)</strong>  Estou cuidando e utilizando o respirador da forma adequada?.</p>

    <p>Não são poucos os itens que precisam estar de acordo para que se
estabeleça um uso seguro de protetores respiratórios. Na dúvida,
pergunte a seu encarregado, pois é a sua segurança que esta em jogo.</p>

<p><strong>Atenção:</strong> A barba impede o ajuste e vedação adequados do respirador,
facilitando a passagem dos contaminantes. Por isso pessoas com barba
não devem usar respiradores que necessitem vedação facial, em caso
de dúvida ou para informação adicional, procure se encarregado</p>

            <h2>COLOCANDO O RESPIRADOR DESCARTÁVEL:</h2>

            <img src="img/protetorRespiratorio2.png" class="imagem-lateral imagem-ajuste-3">

    <p><strong>1:</strong>Apoie o respirador no rosto, inicialmente no
queixo, depois cubra a boca e o nariz. Puxe o
elástico superior, ajustando-o bem acima das
orelhas, faça o mesmo com o elático de baixo,
passando-o pela cabeça e ajustando-o na nuca.</p>

    <p><strong>2:</strong> Com dois dedos de cada mão pressione a
peça de alumínio de forma a moldá-lo ao seu
formato de nariz.</p>

    <p><strong>3:</strong>Para verificar o ajuste, coloque as mãos na
frente do respirador cobrindo toda a sua
superfície e inale. O ar não deve passar pelas
laterais.</p>

    <p><strong>4:</strong> Esta é a forma correta de colocação do
respirador.</p>
   
    ` 

        },

        {
            titulo: "11.3 Uso dos protetores - PARTE 2",
            audio: "audios/modulo11-3.mp3",
            texto: `
            
            <h2>COLOCANDO O RESPIRADOR SEMI FACIAL</h2>

            <img src="img/protetorRespiratorio3.png" class="imagem-lateral imagem-ajuste-5">

            <p><strong>1:</strong>Coloque o respirador no rosto, e posicione o
elástico superior sobre a cabeça. Encaixe os
elásticos inferiores (de baixo) ligando as
presilhas atrás do pescoço.
</p>

            <p><strong>2:</strong>Puxe as extremidades dos elásticos
superiores, e depois os inferiores, para fazer o
ajuste do respirador no rosto.
</p>

            <p><strong>3:</strong>Verificação de vedação com pressão positiva:
Coloque a palma da mão sobre a válvula de
exalação e assopre suavemente várias vezes. A
peça facial deverá se expandir suavemente sem
ocorrer vazamentos.
</p>

            <p><strong>4:</strong> Teste de pressão negativa: Coloque as mãos
sobre os cartuchos e/ou filtros e inale
profundamente várias vezes. A peça facial
deverá comprimir levemente contra o rosto sem
ocorrer vazamento.
</p>

            <h2>PROTEÇÃO DO TRONCO E CORPO INTEIRO</h2>
    
            <img src="img/protetorCorpo.png" class="imagem-lateral imagem-ajuste-3">
    
            <p>Este tipo de proteção é composta
básicamente por calças, conjuntos de calça e
blusão, aventais, capas, tem como finalidade a
proteção contra calor, frio, produtos
químicos, umidade, intempéries, etc.</p>

            <h2>PROTEÇÃO DOS MEMBROS SUPERIORES</h2>

            <img src="img/protetorMao.png" class="imagem-lateral imagem-ajuste-7">

            <p>Este tipo de proteção é composta básicamente
por luvas, cremes protetor, mangas,
braçadeiras, dedeiras, etc.</p>

            <p><strong>Luvas Impermeáveis:</strong> Nitrilica, Látex, são
indicadas para trabalhos que envolvam umidade
e produtos químicos.</p>

            <p><strong>Luvas contra Temperaturas:</strong> Kevlar, Raspa, Grafatex, são indicadas
para trabalhos que envolvam temperaturas extremas.</p>

            <p><strong>Luvas contra Cortes:</strong> Raspa, Couro, Kevlar, são indicadas para
trabalhos onde haja o manuseio de materiais com rebarbas ou cortantes.</p>

            <p><strong>Cremes Protetores:</strong> Outra forma de proteção das mãos são os cremes,
que tem a finalidade de criar uma película que impede a ação de alguns
agentes agressivos, principalmete os produtos químicos.</p>

            <h2>PROTEÇÃO DOS MEMBROS INFERIORES</h2>

            <img src="img/protetorPe.png" class="imagem-lateral imagem-ajuste-3">

            <p>Este tipo de proteção é composta básicamente
por calçados, meias, perneiras, calças, etc.</p>

            <p><strong>Acidentes com os Pés:</strong> Fraturas, choques
elétricos, dermatoses, queimaduras, bactérias
e radiações, são alguns dos riscos aos quais os
pés ficam expostos durante a execução de
determinadas tarefas. O trabalho de manuseio
de materiais pesados ou cortantes, o choque contra objetos 
estáticos ou em movimento, os pisos irregulares ou
escorregadios e a exposição do trabalhador a produtos químicos,
frio, calor intenso, são fatores responsáveis por muitos 
acidentes de trabalho com prejuízos aos pés. </p>

            `
        },
    ]

},

{
    titulo: "12. Recomendações Finais",
    audio: "audios/modulo12.mp3",
    texto: `
    
    <p>Os acidentes nunca acontecem por acaso, eles são provocados. Uma das
melhores maneiras de evitá-los é procurar primeiro conhecer o modo
correto e seguro de realizar o trabalho antes de iniciá-lo.
As causas mais freqüentes de acidentes são:</p>

<p><strong>I:</strong> Falta de atenção;</p>
<p><strong>II:</strong> Falta de experiência;</p>
<p><strong>III:</strong> Inobservância às normas de segurança.</p>

    <p>Se houver a necessidade de executar atividades em outro setor ou
maquinário, sempre solicite a ordem de serviço para esta atividade.
É fundamental que você conheça todos os riscos da atividade e formas
de prevenção para que sua saúde e integridade física sejam
preservadas. Procure o encarregado do setor para obtenção e
autorização de seu trabalho no local. Lembrete: não realize atividades
sem o conhecimento de seus riscos, pois você estará propiciando um
procedimento inseguro, passível de punição.</p>

    <p>Utilize o equipamento de segurança conforme o risco encontrado em sua
atividade, em caso de dúvidas, procure orientação junto ao seu
encarregado ou algum membro da CIPA. Em caso de perda do EPI ou
no caso de o equipamento estiver danificado, faça sua substituição
imediata. O equipamento de segurança é gratuito e tem como objetivo
preservar sua saúde e integridade física.</p>

    <p>Em caso de problemas elétricos e/ou mecânico em seu setor ou
equipamento de trabalho, comunique imediatamente a seu encarregado.
Não faça nenhuma manutenção em equipamento sem ter qualificação,
habilitação e autorização.</p>

    <p>Antes de iniciar o seu turno de trabalho, verifique as condições gerais
do equipamento e das instalações. Qualquer problema que coloque em
risco a sua segurança, solicite a manutenção imediata ou substituição.</p>
    
    
    ` 
    

  }

];
const textoBoasVindas = {
    texto: ` 
    <p>"Olá! Seja muito bem-vindo ao nosso treinamento de Integração de Segurança. É uma satisfação enorme ter você em nossa equipe. 
    Para começarmos, por favor, insira o seu nome completo abaixo. (LINHA 676, CORRIGIR ESCRITA E INTEGRAR E-MAIL PRA RETORNAR ACESSO)",</p>
    `,
    audio: "audios/boas-vindas.mp3"
};

let estado = {
    nomeUsuario: localStorage.getItem('integracao_nome') || '',
    etapaAtual: parseInt(localStorage.getItem('integracao_etapa')) || 0,
    parteAtual: parseInt(localStorage.getItem('integracao_parte')) || 0,
    maiorEtapa: parseInt(localStorage.getItem('integracao_maior_etapa')) || 0
};

let partesLiberadas = JSON.parse(
    localStorage.getItem('integracao_partes_liberadas') || '{}'
);

const app = document.getElementById('app');
let tocadorAudio = new Audio();

// Gerador do HTML do Robô em CSS (assim ele nunca quebra em nenhuma tela)
function getAvatarHTML() {
    return `
        <div class="avatar-container">
            <div id="robo-avatar" class="worker-avatar">

                <svg
                    class="worker-svg"
                    viewBox="0 0 220 220"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Trabalhador de segurança"
                    role="img"
                >

                    <!-- SOMBRA -->
                    <ellipse
                        class="worker-shadow"
                        cx="110"
                        cy="207"
                        rx="55"
                        ry="7"
                    />

                    <!-- CORPO -->
                    <g class="worker-body">

                        <!-- BRAÇO ESQUERDO -->
                        <g class="worker-arm worker-arm-left">
                            <path
                                d="M62 123
                                   C49 128 43 141 40 155
                                   C38 164 42 170 49 171
                                   C56 172 60 166 62 158
                                   L72 137 Z"
                                fill="#f1b38b"
                            />

                            <path
                                d="M40 155
                                   C35 157 32 162 34 167
                                   C36 172 42 174 47 171
                                   C51 169 52 165 49 161
                                   Z"
                                fill="#e8a477"
                            />
                        </g>

                        <!-- TRONCO / CAMISA -->
                        <path
                            class="worker-shirt"
                            d="M72 112
                               C83 106 137 106 148 112
                               L166 195
                               C145 202 75 202 54 195
                               L72 112 Z"
                            fill="#f5f7fa"
                        />

                        <!-- COLETE -->
                        <path
                            class="worker-vest-left"
                            d="M74 111
                               L91 118
                               L82 195
                               L55 195
                               L72 112 Z"
                            fill="#f28c28"
                        />

                        <path
                            class="worker-vest-right"
                            d="M146 111
                               L129 118
                               L138 195
                               L165 195
                               L148 112 Z"
                            fill="#f28c28"
                        />

                        <!-- FAIXAS REFLETIVAS -->
                        <path
                            d="M67 148 L85 153"
                            stroke="#fff"
                            stroke-width="6"
                            stroke-linecap="round"
                            opacity=".9"
                        />

                        <path
                            d="M153 148 L135 153"
                            stroke="#fff"
                            stroke-width="6"
                            stroke-linecap="round"
                            opacity=".9"
                        />

                        <path
                            d="M61 176 L82 180"
                            stroke="#fff"
                            stroke-width="5"
                            stroke-linecap="round"
                            opacity=".9"
                        />

                        <path
                            d="M159 176 L138 180"
                            stroke="#fff"
                            stroke-width="5"
                            stroke-linecap="round"
                            opacity=".9"
                        />

                        <!-- GOLA -->
                        <path
                            d="M91 111
                               Q110 130 129 111"
                            fill="none"
                            stroke="#d7dde4"
                            stroke-width="4"
                        />

                        <!-- CRACHÁ -->
                        <g class="worker-badge">
                            <rect
                                x="113"
                                y="139"
                                width="23"
                                height="30"
                                rx="3"
                                fill="#ffffff"
                                stroke="#cbd5e1"
                                stroke-width="1.5"
                            />

                            <circle
                                cx="124.5"
                                cy="147"
                                r="4"
                                fill="#94a3b8"
                            />

                            <path
                                d="M118 156 H131"
                                stroke="#94a3b8"
                                stroke-width="2"
                                stroke-linecap="round"
                            />

                            <path
                                d="M118 161 H128"
                                stroke="#cbd5e1"
                                stroke-width="2"
                                stroke-linecap="round"
                            />
                        </g>

                        <!-- BRAÇO DIREITO -->
                        <g class="worker-arm worker-arm-right">

                            <path
                                d="M148 121
                                   C162 124 171 137 174 151
                                   C176 160 173 169 166 171
                                   C159 173 154 167 153 159
                                   L143 137 Z"
                                fill="#f1b38b"
                            />

                            <path
                                d="M174 151
                                   C180 153 184 158 182 164
                                   C181 170 175 173 169 170
                                   C165 168 164 163 166 159
                                   Z"
                                fill="#e8a477"
                            />
                        </g>

                        <!-- PESCOÇO -->
                        <path
                            d="M95 96
                               L95 113
                               Q110 123 125 113
                               L125 96 Z"
                            fill="#e8a477"
                        />

                        <!-- CABEÇA -->
                        <g class="worker-head">

                            <!-- ORELHAS -->
                            <circle
                                cx="78"
                                cy="77"
                                r="8"
                                fill="#e8a477"
                            />

                            <circle
                                cx="142"
                                cy="77"
                                r="8"
                                fill="#e8a477"
                            />

                            <!-- ROSTO -->
                            <path
                                d="M81 51
                                   Q110 35 139 51
                                   L139 82
                                   Q136 105 110 111
                                   Q84 105 81 82 Z"
                                fill="#f1b38b"
                            />

                            <!-- CABELO -->
                            <path
                                d="M83 57
                                   Q87 41 110 41
                                   Q133 41 137 57
                                   L131 64
                                   Q124 53 110 53
                                   Q96 53 89 64 Z"
                                fill="#3b2f2a"
                            />

                            <!-- SOBRANCELHAS -->
                            <path
                                d="M91 72 Q98 68 104 72"
                                fill="none"
                                stroke="#5b463d"
                                stroke-width="3"
                                stroke-linecap="round"
                            />

                            <path
                                d="M116 72 Q122 68 129 72"
                                fill="none"
                                stroke="#5b463d"
                                stroke-width="3"
                                stroke-linecap="round"
                            />

                            <!-- OLHO ESQUERDO -->
                            <ellipse
                                cx="98"
                                cy="78"
                                rx="4"
                                ry="3"
                                fill="#263238"
                            />

                            <!-- OLHO DIREITO -->
                            <ellipse
                                cx="122"
                                cy="78"
                                rx="4"
                                ry="3"
                                fill="#263238"
                            />

                            <!-- NARIZ -->
                            <path
                                d="M110 78
                                   Q106 88 111 89
                                   Q115 90 117 87"
                                fill="none"
                                stroke="#d18c68"
                                stroke-width="2"
                                stroke-linecap="round"
                            />

                            <!-- BOCA -->
                            <g class="worker-mouth">

                                <path
                                    class="mouth-closed"
                                    d="M101 96 Q110 100 119 96"
                                    fill="none"
                                    stroke="#8e4d49"
                                    stroke-width="2.5"
                                    stroke-linecap="round"
                                />

                                <ellipse
                                    class="mouth-open"
                                    cx="110"
                                    cy="97"
                                    rx="8"
                                    ry="4"
                                    fill="#8e4d49"
                                />

                            </g>

                        </g>

                        <!-- CAPACETE -->
                        <g class="worker-helmet">

                            <!-- ABA -->
                            <path
                                d="M65 61
                                   Q110 48 155 61
                                   Q163 64 158 69
                                   Q110 76 62 69
                                   Q57 65 65 61 Z"
                                fill="#e5e7eb"
                                stroke="#cbd5e1"
                                stroke-width="2"
                            />

                            <!-- CASCO -->
                            <path
                                d="M72 61
                                   Q74 28 110 26
                                   Q146 28 148 61
                                   Z"
                                fill="#ffffff"
                                stroke="#cbd5e1"
                                stroke-width="2"
                            />

                            <!-- DETALHE DO CAPACETE -->
                            <path
                                d="M92 30
                                   Q110 25 128 30"
                                fill="none"
                                stroke="#f59e0b"
                                stroke-width="5"
                                stroke-linecap="round"
                            />

                            <!-- PEQUENO LOGO -->
                            <circle
                                cx="110"
                                cy="43"
                                r="8"
                                fill="#f59e0b"
                            />

                            <path
                                d="M106 43 L109 46 L115 39"
                                fill="none"
                                stroke="#fff"
                                stroke-width="2.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />

                        </g>

                    </g>

                </svg>

            </div>
        </div>
    `;
}

async function iniciarSistema() {
    const token = localStorage.getItem('integracao_token');
    const usuarioSalvo = localStorage.getItem('integracao_usuario');

    if (token && usuarioSalvo) {
        try {
            const usuario = JSON.parse(usuarioSalvo);

            estado.nomeUsuario = usuario.nome || '';
            estado.etapaAtual = Number(usuario.modulo_atual) || 1;
            estado.parteAtual = Number(usuario.parte_atual) || 0;

            // Se o treinamento já foi concluído,
            // o usuário permanece no estado final.
            if (usuario.treinamento_concluido === true) {
                estado.etapaAtual = modulos.length + 1;
                estado.parteAtual = 0;
                estado.maiorEtapa = modulos.length;
                renderConclusao();
                return;
            }

            await carregarProgressoServidor();

            init();
            return;

        } catch (erro) {
            console.error(
                'Erro ao restaurar sessão:',
                erro
            );

            localStorage.removeItem('integracao_token');
            localStorage.removeItem('integracao_usuario');
        }
    }

    estado.nomeUsuario = '';
    estado.etapaAtual = 0;
    estado.parteAtual = 0;

    renderHome();
}

function init() {
    pararLeitura();
    atualizarTopbar();
    
    if (!estado.nomeUsuario || estado.etapaAtual === 0) {
        renderHome();
    } else if (estado.etapaAtual <= modulos.length) {
        renderLayout(estado.etapaAtual - 1);
    } else {
        renderConclusao();
    }
}

function renderPainelAdmin() {
    app.innerHTML = `
        <div class="main-content">
            <div class="container">

                <h2 style="
                    text-align: center;
                    color: var(--primary-color);
                ">
                    Painel do Administrador
                </h2>

                <p style="
                    text-align: center;
                    margin-bottom: 25px;
                ">
                    Cadastre um novo colaborador.
                    O sistema irá gerar automaticamente o usuário
                    e a senha de acesso.
                </p>

                <form
                    id="form-cadastro-colaborador"
                    style="
                        max-width: 500px;
                        margin: 30px auto;
                    "
                >

                    <input
                        type="text"
                        id="admin-nome"
                        placeholder="Nome completo do colaborador"
                        required
                        style="
                            width: 100%;
                            margin-bottom: 12px;
                        "
                    >

                    <input
                        type="email"
                        id="admin-email"
                        placeholder="E-mail do colaborador"
                        required
                        style="
                            width: 100%;
                            margin-bottom: 12px;
                        "
                    >

                    <button
                        type="submit"
                        class="btn"
                        style="width: 100%;"
                    >
                        CADASTRAR COLABORADOR
                    </button>

                    <div
                        id="admin-credenciais"
                        style="
                            display: none;
                            margin-top: 25px;
                            padding: 20px;
                            border-radius: 10px;
                            background: #f5f5f5;
                            text-align: center;
                        "
                    >

                        <h3>
                            ✅ Colaborador cadastrado
                        </h3>

                        <p>
                            Entregue estas credenciais ao colaborador:
                        </p>

                        <p>
                            <strong>Usuário:</strong>
                            <span id="admin-usuario-gerado"></span>
                        </p>

                        <p>
                            <strong>Senha temporária:</strong>
                            <span id="admin-senha-gerada"></span>
                        </p>

                    </div>

                    <p
                        id="admin-mensagem"
                        style="
                            display: none;
                            margin-top: 20px;
                            text-align: center;
                            font-weight: bold;
                        "
                    ></p>

                </form>

            </div>
        </div>
    `;

    const formulario =
        document.getElementById(
            'form-cadastro-colaborador'
        );

    formulario.addEventListener(
        'submit',
        cadastrarColaborador
    );
}

function atualizarTopbar() {

    const userBox =
        document.getElementById('topbar-user');

    const userName =
        document.getElementById('topbar-nome');

    const btnReset =
        document.getElementById('btn-reset');

    const estaNoTreinamento =
    !!estado.nomeUsuario &&
    estado.etapaAtual > 0;

    const podeReiniciarCurso =
    !!estado.nomeUsuario &&
    estado.etapaAtual >= 1 &&
    estado.etapaAtual <= modulos.length;

    if (estaNoTreinamento) {

        userName.innerText =
            estado.nomeUsuario;

        userBox.style.display =
            'flex';

        if (btnReset) {
            btnReset.style.display =
                podeReiniciarCurso ? 'block' : 'none';
}

        document.body.classList.remove(
            'modo-login'
        );

    } else {

        userBox.style.display =
            'none';

        if (btnReset) {
            btnReset.style.display =
                'none';
        }

        document.body.classList.add(
            'modo-login'
        );
    }
}

function formatarTextoEmSpans(texto) {
    let indice = 0;

    return texto.replace(/(<[^>]*>)|(\S+)/g, (match, tag, palavra) => {
        if (tag) {
            return tag;
        }

        return `<span class="palavra" id="palavra-${indice++}">${palavra}</span>`;
    });
}

formatarTextoEmSpans.contador = 0;

function alternarBloqueioUI(bloquear) {

    const btn = document.getElementById('btn-avancar');

    // O botão CONTINUAR fica bloqueado durante a leitura.
    if (btn) {
        btn.disabled = bloquear;
    }

    // O menu NUNCA é bloqueado pelo áudio.
    // O próprio mudarModulo() / mudarParte()
    // continua responsável por impedir acesso
    // a módulos e partes que ainda não foram liberados.
}

function tocarAudioESincronizar(caminhoAudio, textoCompleto, ehTelaInicial = false) {
    tocadorAudio.onended = () => {
    document
        .querySelectorAll('.palavra.lendo')
        .forEach(el => el.classList.remove('lendo'));

    alternarBloqueioUI(false);

    const robo = document.getElementById('robo-avatar');

    if (robo) {
        robo.classList.remove('falando');
    }

    const botaoAudio = document.getElementById('btn-play-pause');

    if (botaoAudio) {
        botaoAudio.innerText = '▶';
        botaoAudio.setAttribute('aria-label', 'Reproduzir áudio');
    }

    if (ehTelaInicial) {
        liberarFormularioLogin();
    }
};
    pararLeitura();

    tocadorAudio = new Audio(caminhoAudio);

    tocadorAudio.currentTime = 0;
    tocadorAudio.load();

    // Remove as tags HTML apenas para calcular as palavras visíveis
    const textoSemTags = textoCompleto.replace(/<[^>]*>/g, " ");

    const palavras = textoSemTags
        .replace(/\s+/g, " ")
        .trim()
        .split(" ");

    // Total de caracteres somente das palavras visíveis
    const totalCaracteres = palavras.join(" ").length;

   
    // Ajuste de sincronização:
// mais forte no início e vai diminuindo até desaparecer.
    const atrasoInicial = 0.1;
    const tempoDeAjuste = 0.1;

    tocadorAudio.ontimeupdate = () => {

    const robo = document.getElementById('robo-avatar');

    if (robo) {
        const falandoAgora = !tocadorAudio.paused && !tocadorAudio.ended;

        robo.classList.toggle('falando', falandoAgora);
    }

    if (!tocadorAudio.duration || totalCaracteres === 0) return;

    const tempoAtual = tocadorAudio.currentTime;
    const duracaoTotal = tocadorAudio.duration;

    const fatorAjuste = Math.max(
        0,
        1 - (tempoAtual / tempoDeAjuste)
    );

    const atrasoDinamico = atrasoInicial * fatorAjuste;

    const tempoSincronizado = Math.max(
        0,
        tempoAtual - atrasoDinamico
        )

        const progresso = Math.min(
            1,
            tempoSincronizado / duracaoTotal
        );


        // Descobre aproximadamente qual palavra deve estar sendo lida
        const charAlvo = progresso * totalCaracteres;

        let acumuladorChar = 0;
        let indexAtual = 0;

        for (let i = 0; i < palavras.length; i++) {
            acumuladorChar += palavras[i].length;

            if (i < palavras.length - 1) {
                acumuladorChar += 1;
            }

            if (acumuladorChar >= charAlvo) {
                indexAtual = i;
                break;
            }

            // Garante que a última palavra seja alcançada
            indexAtual = i;
        }

        const elAtual = document.getElementById(`palavra-${indexAtual}`);
        const elLendo = document.querySelector('.palavra.lendo');

        if (elAtual && elAtual !== elLendo) {
            if (elLendo) {
                elLendo.classList.remove('lendo');
            }

            elAtual.classList.add('lendo');
        }
    };

    tocadorAudio.onplay = () => {
        alternarBloqueioUI(true);

        const robo = document.getElementById('robo-avatar');

        if (robo) {
            robo.classList.add('falando');
        }
    };

    tocadorAudio.onended = () => {
        document
            .querySelectorAll('.palavra.lendo')
            .forEach(el => el.classList.remove('lendo'));

        alternarBloqueioUI(false);

        const robo = document.getElementById('robo-avatar');

        if (robo) {
            robo.classList.remove('falando');
        }

        if (ehTelaInicial) {
            liberarFormularioLogin();
        }
    };

    tocadorAudio.onerror = () => {

        alternarBloqueioUI(false);

        const robo = document.getElementById('robo-avatar');

        if (robo) {
            robo.classList.remove('falando');
        }

        console.error(
            'Erro ao carregar ou reproduzir o áudio:',
            caminhoAudio
        );
    };

    
tocadorAudio.play().catch(() => {

    const iniciarAudioComInteracao = () => {

        document.removeEventListener(
            'click',
            iniciarAudioComInteracao
        );

        document.removeEventListener(
            'touchstart',
            iniciarAudioComInteracao
        );

        document.removeEventListener(
            'keydown',
            iniciarAudioComInteracao
        );

        tocadorAudio.currentTime = 0;

        tocadorAudio.play().catch(() => {});
    };

    document.addEventListener(
        'click',
        iniciarAudioComInteracao,
        { once: true }
    );

    document.addEventListener(
        'touchstart',
        iniciarAudioComInteracao,
        { once: true }
    );

    document.addEventListener(
        'keydown',
        iniciarAudioComInteracao,
        { once: true }
    );

});
        }

function alternarAudio() {
    if (!tocadorAudio || !tocadorAudio.src) return;

    const botao = document.getElementById('btn-play-pause');
    const robo = document.getElementById('robo-avatar');

    if (tocadorAudio.paused) {

        tocadorAudio.play();

        if (botao) {
            botao.innerText = '⏸';
            botao.setAttribute('aria-label', 'Pausar áudio');
        }

        if (robo) {
            robo.classList.add('falando');
        }

    } else {

        tocadorAudio.pause();

        if (botao) {
            botao.innerText = '▶';
            botao.setAttribute('aria-label', 'Continuar áudio');
        }

        if (robo) {
            robo.classList.remove('falando');
        }
    }
}

function pararLeitura() {
    if (tocadorAudio) {
        tocadorAudio.pause();
        tocadorAudio.currentTime = 0;
    }
    document.querySelectorAll('.palavra.lendo').forEach(el => el.classList.remove('lendo'));
    const robo = document.getElementById('robo-avatar');
    if (robo) robo.classList.remove('falando');
    alternarBloqueioUI(false);
}

function renderHome() {

    app.innerHTML = `

        <div
            class="tela-acesso"
            style="
                min-height:100vh;
                width:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:30px 20px;
                box-sizing:border-box;
            "
        >

            <div
                style="
                    width:100%;
                    max-width:620px;
                    display:flex;
                    flex-direction:column;
                    gap:22px;
                "
            >

                <!-- =========================================
                     PRIMEIRO ACESSO
                     ========================================= -->

                <div
                    id="primeiro-acesso"
                    style="
                        padding:28px;
                        border-radius:18px;
                        background:#f7f7f7;
                        box-shadow:0 5px 20px rgba(0,0,0,.10);
                        text-align:left;
                    "
                >

                    <h3
                        style="
                            margin:0 0 12px;
                            color:var(--primary-color);
                        "
                    >
                        PRIMEIRO ACESSO
                    </h3>

                    <p
                        style="
                            margin:0 0 20px;
                            line-height:1.6;
                        "
                    >
                        Ainda não possui acesso?
                        Informe seu nome completo e seu e-mail.
                        O sistema criará seu usuário e sua senha
                        automaticamente e enviará os dados para
                        o seu e-mail.
                    </p>

                    <form
                        id="form-primeiro-acesso"
                        onsubmit="solicitarPrimeiroAcesso(event)"
                    >

                        <input
                            type="text"
                            id="nome-primeiro-acesso"
                            placeholder="Digite seu nome completo..."
                            required
                            autocomplete="name"
                        >

                        <input
                            type="email"
                            id="email-primeiro-acesso"
                            placeholder="Digite seu e-mail..."
                            required
                            autocomplete="email"
                        >

                        <button
                            type="submit"
                            class="btn"
                            id="btn-primeiro-acesso"
                            style="width:100%;"
                        >
                            RECEBER MEU ACESSO
                        </button>

                    </form>

                    <p
                        id="mensagem-primeiro-acesso"
                        style="
                            display:none;
                            margin:18px 0 0;
                            font-weight:600;
                            line-height:1.5;
                        "
                    ></p>

                    <button
                        type="button"
                        id="btn-avancar-primeiro-acesso"
                        class="btn"
                        style="
                            display:none;
                            width:100%;
                            margin-top:15px;
                        "
                        onclick="mostrarLogin()"
                    >
                        AVANÇAR ➡
                    </button>

                </div>


                <!-- =========================================
                     JÁ POSSUI ACESSO
                     ========================================= -->

                <div
                    id="ja-possui-acesso"
                    style="
                        padding:28px;
                        border-radius:18px;
                        background:#f7f7f7;
                        box-shadow:0 5px 20px rgba(0,0,0,.10);
                        text-align:left;
                    "
                >

                    <h3
                        style="
                            margin:0 0 12px;
                            color:var(--primary-color);
                        "
                    >
                        JÁ POSSUI ACESSO?
                    </h3>

                    <p
                        style="
                            margin:0 0 20px;
                            line-height:1.6;
                        "
                    >
                        Utilize o usuário e a senha
                        enviados para o seu e-mail.
                    </p>

                    <button
                        type="button"
                        class="btn"
                        style="width:100%;"
                        onclick="mostrarLogin()"
                    >
                        AVANÇAR ➡
                    </button>

                </div>


                <!-- =========================================
                     LOGIN
                     ========================================= -->

                <div
                    id="area-login"
                    style="
                        display:none;
                        padding:28px;
                        border-radius:18px;
                        background:#f7f7f7;
                        box-shadow:0 5px 20px rgba(0,0,0,.10);
                        text-align:left;
                    "
                >

                    <h3
                        style="
                            margin:0 0 12px;
                            color:var(--primary-color);
                        "
                    >
                        ACESSAR TREINAMENTO
                    </h3>

                    <p
                        style="
                            margin:0 0 20px;
                            line-height:1.6;
                        "
                    >
                        Digite o usuário e a senha
                        recebidos no seu e-mail.
                    </p>

                    <form
                        id="form-login"
                        onsubmit="iniciarIntegracao(event)"
                    >

                        <input
                            type="text"
                            id="login"
                            placeholder="Usuário ou e-mail..."
                            required
                            autocomplete="username"
                            oninput="validarLogin()"
                        >

                        <input
                            type="password"
                            id="senha"
                            placeholder="Digite sua senha..."
                            required
                            autocomplete="current-password"
                            oninput="validarLogin()"
                        >

                        <button
                            type="submit"
                            class="btn"
                            id="btn-iniciar"
                            disabled
                            style="width:100%;"
                        >
                            AVANÇAR ➡
                        </button>

                        <p
                            id="erro-login"
                            style="
                                display:none;
                                margin-top:12px;
                                color:#d32f2f;
                                font-weight:600;
                            "
                        ></p>

                    </form>

                </div>

            </div>

        </div>
    `;

}


/* =====================================================
   PRIMEIRO ACESSO
   ===================================================== */

async function solicitarPrimeiroAcesso(event) {

    event.preventDefault();

    const nomeInput =
        document.getElementById(
            'nome-primeiro-acesso'
        );

    const emailInput =
        document.getElementById(
            'email-primeiro-acesso'
        );

    const botao =
        document.getElementById(
            'btn-primeiro-acesso'
        );

    const mensagem =
        document.getElementById(
            'mensagem-primeiro-acesso'
        );

    const botaoAvancar =
        document.getElementById(
            'btn-avancar-primeiro-acesso'
        );


    const nome =
        nomeInput.value.trim();

    const email =
        emailInput.value
            .trim()
            .toLowerCase();


    mensagem.style.display = 'none';
    mensagem.textContent = '';


    if (!nome || nome.length < 3) {

        mensagem.textContent =
            'Informe seu nome completo.';

        mensagem.style.color =
            '#d32f2f';

        mensagem.style.display =
            'block';

        return;
    }


    if (
        !email ||
        !email.includes('@') ||
        !email.includes('.')
    ) {

        mensagem.textContent =
            'Informe um e-mail válido.';

        mensagem.style.color =
            '#d32f2f';

        mensagem.style.display =
            'block';

        return;
    }


    botao.disabled = true;

    botao.textContent =
        'CRIANDO SEU ACESSO...';


    try {

        const resposta =
            await fetch(
                `${API_URL}/api/auth/primeiro-acesso`,
                {
                    method:'POST',

                    headers:{
                        'Content-Type':
                            'application/json'
                    },

                    body:JSON.stringify({
                        nome: nome,
                        email: email
                    })
                }
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            throw new Error(
                dados.erro ||
                'Não foi possível criar seu acesso.'
            );
        }


        mensagem.textContent =
            '✅ Seu acesso foi criado com sucesso! ' +
            'Enviamos seu usuário e sua senha para o seu e-mail. ' +
            'Confira também a pasta de spam ou lixo eletrônico.';


        mensagem.style.color =
            '#2e7d32';

        mensagem.style.display =
            'block';


        botao.style.display =
            'none';


        nomeInput.disabled =
            true;

        emailInput.disabled =
            true;


        botaoAvancar.style.display =
            'block';


    } catch (erro) {

        console.error(
            'Erro no primeiro acesso:',
            erro
        );


        mensagem.textContent =
            erro.message ||
            'Não foi possível criar seu acesso.';


        mensagem.style.color =
            '#d32f2f';

        mensagem.style.display =
            'block';


    } finally {

        if (
            mensagem.style.color !==
            'rgb(46, 125, 50)'
        ) {
            botao.disabled = false;

            botao.textContent =
                'RECEBER MEU ACESSO';
        }

    }
}


/* =====================================================
   MOSTRA LOGIN
   ===================================================== */

function mostrarLogin() {

    const primeiroAcesso =
        document.getElementById(
            'primeiro-acesso'
        );

    const jaPossui =
        document.getElementById(
            'ja-possui-acesso'
        );

    const areaLogin =
        document.getElementById(
            'area-login'
        );


    if (primeiroAcesso) {
        primeiroAcesso.style.display =
            'none';
    }

    if (jaPossui) {
        jaPossui.style.display =
            'none';
    }

    if (areaLogin) {
        areaLogin.style.display =
            'block';
    }


    const login =
        document.getElementById(
            'login'
        );

    if (login) {
        login.focus();
    }
}


/* =====================================================
   VALIDA LOGIN
   ===================================================== */

function validarLogin() {

    const campoLogin =
        document.getElementById(
            'login'
        );

    const campoSenha =
        document.getElementById(
            'senha'
        );

    const btn =
        document.getElementById(
            'btn-iniciar'
        );


    if (
        !campoLogin ||
        !campoSenha ||
        !btn
    ) {
        return;
    }


    const login =
        campoLogin.value.trim();

    const senha =
        campoSenha.value;


    const loginValido =
        login.length >= 3;

    const senhaValida =
        senha.length >= 6;


    btn.disabled =
        !(loginValido && senhaValida);
}


/* =====================================================
   MOSTRA BOTÃO LARANJA
   ===================================================== */

function mostrarBotaoIniciarTreinamento() {

    app.innerHTML = `

        <div
            style="
                min-height:100vh;
                width:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:30px 20px;
                box-sizing:border-box;
            "
        >

            <button
                type="button"
                id="btn-iniciar-treinamento-final"
                class="btn-iniciar-treinamento"
            >

                <span class="btn-iniciar-icone">
                    🔊
                </span>

                <span>
                    INICIAR TREINAMENTO
                </span>

            </button>

        </div>

    `;


    const botao =
        document.getElementById(
            'btn-iniciar-treinamento-final'
        );


    if (botao) {

        botao.style.display =
            'inline-flex';


        botao.addEventListener(
            'click',
            iniciarTreinamento
        );
    }
}


/* =====================================================
   INICIA O TREINAMENTO DE VERDADE
   ===================================================== */

function iniciarTreinamento() {

    const usuario =
        JSON.parse(
            localStorage.getItem(
                'integracao_usuario'
            ) || 'null'
        );


    if (
        usuario &&
        usuario.treinamento_concluido
    ) {

        init();

        return;
    }


    app.innerHTML = `

        <div class="main-content">

            <div
                class="container"
                style="text-align:center;"
            >

                ${getAvatarHTML()}

                <h2
                    style="
                        color:var(--primary-color);
                    "
                >
                    Integração de Segurança
                </h2>

                <p id="texto-modulo">
                    ${formatarTextoEmSpans(
                        textoBoasVindas.texto
                    )}
                </p>

            </div>

        </div>

    `;


    requestAnimationFrame(() => {

        tocarAudioESincronizar(
            textoBoasVindas.audio,
            textoBoasVindas.texto,
            false
        );

    });

}


/* =====================================================
   LOGIN
   ===================================================== */

async function iniciarIntegracao(e) {

    e.preventDefault();


    const login =
        document
            .getElementById('login')
            .value
            .trim()
            .toLowerCase();


    const senha =
        document
            .getElementById('senha')
            .value;


    const btn =
        document.getElementById(
            'btn-iniciar'
        );

    const erroLogin =
        document.getElementById(
            'erro-login'
        );


    erroLogin.style.display =
        'none';

    erroLogin.textContent =
        '';


    btn.disabled = true;

    btn.textContent =
        'VERIFICANDO...';


    try {

        const resposta =
            await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method:'POST',

                    headers:{
                        'Content-Type':
                            'application/json'
                    },

                    body:JSON.stringify({
                        login: login,
                        senha: senha
                    })
                }
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            throw new Error(
                dados.erro ||
                'Não foi possível realizar o login.'
            );
        }


        /* -----------------------------------------
           SALVA TOKEN
           ----------------------------------------- */

        localStorage.setItem(
            'integracao_token',
            dados.token
        );


        /* -----------------------------------------
           SALVA USUÁRIO
           ----------------------------------------- */

        localStorage.setItem(
            'integracao_usuario',
            JSON.stringify(
                dados.usuario
            )
        );


        estado.nomeUsuario =
            dados.usuario.nome || '';


        /* -----------------------------------------
           ADMIN / RH
           ----------------------------------------- */

        if (
            dados.usuario.role === 'admin' ||
            dados.usuario.role === 'rh'
        ) {

            renderPainelAdmin();

            return;
        }


        /* -----------------------------------------
           RESTAURA PROGRESSO
           ----------------------------------------- */

        estado.etapaAtual =
            Number(
                dados.usuario.modulo_atual
            ) || 1;


        estado.parteAtual =
            Number(
                dados.usuario.parte_atual
            ) || 0;


        estado.maiorEtapa =
            Math.max(
                estado.etapaAtual,
                1
            );


        partesLiberadas = {};


        localStorage.removeItem(
            'integracao_partes_liberadas'
        );


        salvarEstado();


        await carregarProgressoServidor();


        /* -----------------------------------------
           NÃO INICIA O TREINAMENTO AQUI.
           PRIMEIRO MOSTRA O BOTÃO LARANJA.
           ----------------------------------------- */

        mostrarBotaoIniciarTreinamento();


    } catch (erro) {

        console.error(
            'Erro no login:',
            erro
        );


        erroLogin.textContent =
            erro.message;

        erroLogin.style.display =
            'block';


        btn.disabled = false;

        btn.textContent =
            'AVANÇAR';
    }
}

function atualizarProgressoVisual() {
    const preenchido = document.getElementById('progresso-preenchido');
    const porcentagem = document.getElementById('porcentagem-progresso');

    if (!preenchido || !porcentagem) return;

    const total = modulos.length;

    let atual = estado.etapaAtual;

    if (estado.etapaAtual > total) {
        atual = total;
    }

    const percentual = Math.round((atual / total) * 100);

    preenchido.style.width = `${percentual}%`;
    porcentagem.textContent = `${percentual}%`;
}

function renderLayout(index) {
    const modulo = modulos[index];

    const parte = modulo.partes
        ? (modulo.partes[estado.parteAtual] || modulo.partes[0])
        : modulo;
    let menuHtml = '';

    
    
    modulos.forEach((m, idx) => {
        const numEtapa = idx + 1;
        const estaLiberado = numEtapa <= estado.maiorEtapa;
        const estaAtivo = numEtapa === estado.etapaAtual;

        let subpartesHtml = '';

if (m.partes && estaLiberado) {
    const maiorParteLiberada = partesLiberadas[numEtapa] ?? 0;

    subpartesHtml = m.partes.map((p, parteIndex) => {
        const liberada = parteIndex <= maiorParteLiberada;
        const ativa =
            numEtapa === estado.etapaAtual &&
            parteIndex === estado.parteAtual;

        return `
            <div
                class="subparte-item ${ativa ? 'subparte-ativa' : ''} ${!liberada ? 'subparte-bloqueada' : ''}"
                onclick="${liberada ? `mudarParte(${numEtapa}, ${parteIndex})` : ''}"
            >
                <span>${liberada ? (ativa ? '📖' : '✅') : '🔒'}</span>
                <span>${p.titulo}</span>
            </div>
        `;
    }).join('');
}
        
        let classe = 'bloqueado';
        let icone = '🚫';
        if (estaAtivo) { classe = 'ativo liberado'; icone = '📖'; }
        else if (estaLiberado) { classe = 'liberado'; icone = '✅'; }

       menuHtml += `
    <li class="menu-item ${classe}" onclick="${estaLiberado ? `mudarModulo(${numEtapa}); fecharMenuMobile()` : ''}">
        <span>${m.titulo}</span>
        <span>${icone}</span>
    </li>

    ${subpartesHtml}
`;
    });

    app.innerHTML = `
        <div class="layout-wrapper">
            <aside class="sidebar">
                <div class="sidebar-title">Trilha de Aprendizagem</div>
                <div class="progresso-trilha">
                <div class="progresso-info">
                    <span>Seu progresso</span>
                    <span id="porcentagem-progresso">0%</span>
            </div>

                <div class="progresso-barra">
            <div
                class="progresso-preenchido"
                id="progresso-preenchido"
                ></div>
            </div>
        </div>
                <ul class="menu-list">${menuHtml}</ul>
            </aside>
            <main class="main-content">
                <div class="container">

                     <h2>${parte.titulo}</h2>

                     <p id="texto-modulo">${formatarTextoEmSpans(parte.texto)}</p>

                    <button
                        class="btn"
                        id="btn-avancar"
                        onclick="avancarEtapa()"
                    >
                        CONTINUAR ➡
                    </button>

                </div>

                <div class="controles-flutuantes">

                    ${getAvatarHTML()}

                    <button
                        class="btn-controle-audio"
                        id="btn-play-pause"
                        onclick="alternarAudio()"
                        aria-label="Pausar áudio"
                    >
                        ⏸
                    </button>

                </div>
            </main>
        </div>
    `;
    atualizarProgressoVisual();
        setTimeout(() => {
            tocarAudioESincronizar(parte.audio, parte.texto);
    }, 100);
}

function mudarParte(numEtapa, numParte) {
        if (
        !estado.nomeUsuario ||
        estado.etapaAtual === 0 ||
        estado.etapaAtual > modulos.length
    ) {
        return;
    }

    const modulo = modulos[numEtapa - 1];

    if (!modulo || !modulo.partes) return;

    const maiorParteLiberada = partesLiberadas[numEtapa] ?? 0;

    // Não permite entrar em uma parte ainda bloqueada
    if (numParte > maiorParteLiberada) return;

    estado.etapaAtual = numEtapa;
    estado.parteAtual = numParte;

    salvarEstado();
    fecharMenuMobile();
    init();
}

function mudarModulo(numEtapa) {

    // Usuário precisa estar autenticado.
    if (!estado.nomeUsuario) {
        return;
    }

    // Nunca permite acessar módulos fora do treinamento.
    if (
        numEtapa < 1 ||
        numEtapa > modulos.length
    ) {
        return;
    }

    // Nunca permite acessar módulo bloqueado.
    if (numEtapa > estado.maiorEtapa) {
        return;
    }

    // Nunca permite voltar aos módulos depois da conclusão.
    if (estado.etapaAtual > modulos.length) {
        return;
    }

    estado.etapaAtual = numEtapa;
    estado.parteAtual = 0;

    salvarEstado();
    fecharMenuMobile();
    init();
}

async function avancarEtapa() {
    const moduloAtual = modulos[estado.etapaAtual - 1];

    if (!moduloAtual) {
        return;
    }

    /*
     * ==========================================
     * MÓDULO COM PARTES
     * ==========================================
     */
    if (moduloAtual.partes) {

        /*
         * Salva no banco a parte que acabou de ser concluída.
         *
         * O frontend usa índice 0, 1, 2...
         * O banco usa 1, 2, 3...
         */
        await salvarProgressoServidor(
            estado.etapaAtual,
            estado.parteAtual + 1,
            true
        );

        /*
         * Ainda existem partes pela frente.
         */
        if (
            estado.parteAtual <
            moduloAtual.partes.length - 1
        ) {
            estado.parteAtual++;

            const numeroModulo = estado.etapaAtual;

            partesLiberadas[numeroModulo] = Math.max(
                partesLiberadas[numeroModulo] ?? 0,
                estado.parteAtual
            );

            localStorage.setItem(
                'integracao_partes_liberadas',
                JSON.stringify(partesLiberadas)
            );

            salvarEstado();
            init();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            return;
        }

        /*
         * Última parte do módulo.
         * Volta o índice da parte para 0
         * antes de avançar para o próximo módulo.
         */
        else {
            estado.parteAtual = 0;
        }
    }

    /*
     * ==========================================
     * MÓDULO SEM PARTES
     * ==========================================
     *
     * Para módulos normais, o banco usa parte = 1.
     */
    else {
        await salvarProgressoServidor(
            estado.etapaAtual,
            1,
            true
        );
    }

    /*
     * ==========================================
     * CONCLUSÃO DO TREINAMENTO
     * ==========================================
     *
     * Se acabou de concluir o último módulo,
     * marca o treinamento como concluído no banco.
     */
    if (estado.etapaAtual === modulos.length) {
        const concluido = await concluirTreinamentoServidor();

        if (!concluido) {
            console.error(
                '❌ Não foi possível registrar a conclusão do treinamento.'
            );

            return;
        }
    }

    /*
     * ==========================================
     * VAI PARA O PRÓXIMO MÓDULO
     * ==========================================
     */

    estado.etapaAtual++;

    if (estado.etapaAtual > estado.maiorEtapa) {
        estado.maiorEtapa = estado.etapaAtual;
    }

    salvarEstado();

    init();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function renderConclusao() {

    const app = document.getElementById('app');

    const dataAtual = new Date().toLocaleDateString('pt-BR');

    app.innerHTML = `
        <div class="conclusao-box">

            <div class="conclusao-icone">
                🎉
            </div>

            <h1>Treinamento Concluído!</h1>

            <p>
                Parabéns, <strong>${estado.nomeUsuario}</strong>!
            </p>

            <p>
                Você finalizou todas as etapas obrigatórias
                da Integração de Segurança.
            </p>

            <div class="conclusao-mensagem">
                Seu treinamento foi concluído com sucesso.
            </div>

            <button class="btn" onclick="gerarPDF()">
                🏆 EMITIR CERTIFICADO
            </button>

        </div>
    `;

    document.getElementById('cert-nome-aluno').innerText = estado.nomeUsuario;
    document.getElementById('cert-data').innerText = dataAtual;
}

function gerarPDF() {
    const elemento = document.getElementById('certificado-conteudo');
    const area = document.getElementById('certificado-area');
    area.style.display = 'block';

    html2pdf().set({
        margin: 10,
        filename: `Certificado_${estado.nomeUsuario.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    }).from(elemento).save().then(() => area.style.display = 'none');
}

async function salvarProgressoServidor(modulo, parte, concluido = true) {
    const token = localStorage.getItem('integracao_token');

    if (!token) {
        console.warn(
            'Token não encontrado. Progresso não enviado ao servidor.'
        );
        return;
    }

    try {

        const resposta = await fetch(
            `${API_URL}/api/progresso`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    modulo: modulo,
                    parte: parte,
                    concluido: concluido
                })
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                dados.erro || 'Erro ao salvar progresso.'
            );
        }

        console.log(
            '✅ Progresso salvo no servidor:',
            dados.progresso
        );

    } catch (erro) {

        console.error(
            '❌ Erro ao salvar progresso no servidor:',
            erro
        );
    }
}

async function concluirTreinamentoServidor() {
    const token = localStorage.getItem('integracao_token');

    if (!token) {
        console.error('❌ Token não encontrado.');
        return false;
    }

    try {
        const resposta = await fetch(
            `${API_URL}/api/progresso/concluir`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                dados.erro || 'Erro ao concluir treinamento.'
            );
        }

        console.log('🎓 Treinamento marcado como concluído no servidor.');

        const usuarioSalvo = localStorage.getItem('integracao_usuario');

        if (usuarioSalvo) {
            try {
                const usuario = JSON.parse(usuarioSalvo);
            
                usuario.treinamento_concluido = true;
                usuario.modulo_atual = modulos.length + 1;
                usuario.parte_atual = 0;
            
                localStorage.setItem(
                    'integracao_usuario',
                    JSON.stringify(usuario)
                );
            
            } catch (erro) {
                console.error(
                    'Erro ao atualizar usuário salvo:',
                    erro
                );
            }
        }

        estado.etapaAtual = modulos.length + 1;
        estado.parteAtual = 0;
        estado.maiorEtapa = modulos.length;

        return true;

    } catch (erro) {
        console.error(
            '❌ Erro ao concluir treinamento no servidor:',
            erro
        );

        return false;
    }
}

function salvarEstado() {
    localStorage.setItem('integracao_nome', estado.nomeUsuario);
    localStorage.setItem('integracao_etapa', estado.etapaAtual);
    localStorage.setItem('integracao_parte', estado.parteAtual);
    localStorage.setItem('integracao_maior_etapa', estado.maiorEtapa);

async function salvarProgressoServidor(modulo, parte, concluido = true) {
    const token = localStorage.getItem('integracao_token');

    if (!token) {
        console.warn('Token não encontrado. Progresso não enviado ao servidor.');
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/api/progresso`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                modulo: modulo,
                parte: parte,
                concluido: concluido
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.erro || 'Erro ao salvar progresso.');
        }

        console.log('✅ Progresso salvo no servidor:', dados.progresso);

    } catch (erro) {
        console.error('❌ Erro ao salvar progresso no servidor:', erro);
    }
}
}


async function carregarProgressoServidor() {
    const token = localStorage.getItem('integracao_token');

    if (!token) {
        console.warn('Token não encontrado.');
        return;
    }

    try {
        const resposta = await fetch(
            `${API_URL}/api/progresso`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                dados.erro || 'Erro ao carregar progresso.'
            );
        }

        const progresso = dados.progresso || [];

        console.log('📚 Progresso recebido:', progresso);

        /*
         * =====================================================
         * NENHUM PROGRESSO
         * =====================================================
         */

        if (progresso.length === 0) {
            partesLiberadas = {};

            estado.etapaAtual = 1;
            estado.parteAtual = 0;
            estado.maiorEtapa = 1;

            salvarEstado();

            return;
        }

        /*
         * =====================================================
         * RESTAURA AS PARTES CONCLUÍDAS
         * =====================================================
         */

        partesLiberadas = {};

        progresso.forEach(item => {

            if (!item.concluido) {
                return;
            }

            const modulo = Number(item.modulo);
            const parte = Number(item.parte);

            if (!partesLiberadas[modulo]) {
                partesLiberadas[modulo] = 0;
            }

            partesLiberadas[modulo] = Math.max(
                partesLiberadas[modulo],
                parte
            );
        });

        /*
         * =====================================================
         * DESCOBRE EXATAMENTE ONDE O COLABORADOR DEVE VOLTAR
         * =====================================================
         */

        let moduloAtual = 1;
        let parteAtual = 0;
        let maiorEtapa = 1;

        for (let i = 0; i < modulos.length; i++) {

            const numeroModulo = i + 1;
            const modulo = modulos[i];

            const partesDoModulo = modulo.partes
                ? modulo.partes.length
                : 1;

            const ultimaParteConcluida =
                partesLiberadas[numeroModulo] ?? 0;

            /*
             * Nenhuma parte deste módulo foi concluída.
             * É aqui que o usuário deve continuar.
             */
            if (ultimaParteConcluida === 0) {
                moduloAtual = numeroModulo;
                parteAtual = 0;
                break;
            }

            /*
             * O módulo possui partes.
             */
            if (modulo.partes) {

                /*
                 * Ainda existem partes não concluídas.
                 *
                 * Exemplo:
                 * parte 1 concluída
                 * parte 2 é a próxima
                 *
                 * Como o frontend usa índice 0:
                 * banco = 1
                 * frontend = 1
                 */
                if (ultimaParteConcluida < partesDoModulo) {

                    moduloAtual = numeroModulo;
                    parteAtual = ultimaParteConcluida;

                    maiorEtapa = numeroModulo;

                    break;
                }

                /*
                 * Todas as partes deste módulo foram concluídas.
                 * Libera o próximo módulo.
                 */
                maiorEtapa = numeroModulo + 1;

                moduloAtual = Math.min(
                    numeroModulo + 1,
                    modulos.length
                );

                parteAtual = 0;

                continue;
            }

            /*
             * =================================================
             * MÓDULO SEM PARTES
             * =================================================
             */

            maiorEtapa = numeroModulo + 1;

            moduloAtual = Math.min(
                numeroModulo + 1,
                modulos.length
            );

            parteAtual = 0;
        }

        /*
         * =====================================================
         * PROTEÇÃO CONTRA VALORES INVÁLIDOS
         * =====================================================
         */

        if (moduloAtual < 1) {
            moduloAtual = 1;
        }

        if (moduloAtual > modulos.length) {
            moduloAtual = modulos.length;
            parteAtual = 0;
        }

        /*
         * =====================================================
         * APLICA O ESTADO RESTAURADO
         * =====================================================
         */

        estado.etapaAtual = moduloAtual;
        estado.parteAtual = parteAtual;
        estado.maiorEtapa = Math.min(
            Math.max(maiorEtapa, moduloAtual),
            modulos.length
        );

        /*
         * Guarda novamente as partes liberadas
         * no navegador para o menu/trilha.
         */

        localStorage.setItem(
            'integracao_partes_liberadas',
            JSON.stringify(partesLiberadas)
        );

        salvarEstado();

        console.log(
            '✅ Progresso restaurado!'
        );

        console.log(
            '📍 Módulo atual:',
            estado.etapaAtual
        );

        console.log(
            '📖 Parte atual:',
            estado.parteAtual
        );

        console.log(
            '🔓 Maior etapa:',
            estado.maiorEtapa
        );

    } catch (erro) {

        console.error(
            '❌ Erro ao carregar progresso:',
            erro
        );
    }
}

async function confirmarReset() {
    const certeza = confirm("⚠️ Tem certeza que deseja reiniciar o treinamento?\n\nTodo o seu progresso atual e dados salvos serão apagados!");
    
    if (certeza) {
        await fetch(
            `${API_URL}/api/progresso/reiniciar`,
            {
                method: "POST",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );
            localStorage.removeItem("integracao_etapa");
            localStorage.removeItem("integracao_parte");
            localStorage.removeItem("integracao_maior_etapa");
       
            location.reload();
    }
}

// Função para abrir o Modal personalizado
function abrirModalReset() {
    // Se o modal já existir na tela, não cria outro
    if (document.getElementById('modal-confirm')) return;

    const modalHTML = `
        <div id="modal-confirm" class="modal-overlay">
            <div class="modal-box">
                <div class="modal-icon">⚠️</div>
                <h3 class="modal-titulo">Reiniciar Treinamento?</h3>
                <p class="modal-descricao">
                    Tem certeza de que deseja sair? <strong>Todo</strong> o seu progresso atual e dados salvos serão apagados!
                </p>
                <div class="modal-acoes">
                    <button type="button" class="btn-modal-cancelar" onclick="fecharModalReset()">Cancelar</button>
                    <button type="button" class="btn-modal-confirmar" onclick="executarReset()">Sim, Reiniciar</button>
                </div>
            </div>
        </div>
    `;
    
    // Insere o modal no final do body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Função para fechar o Modal com animação suave
function fecharModalReset() {
    const modal = document.getElementById('modal-confirm');
    if (modal) {
        modal.classList.add('saindo');
        setTimeout(() => modal.remove(), 200); // Espera a animação acabar antes de remover
    }
}

// Função que realmente limpa o progresso e recarrega a página
async function executarReset() {

    try {

        const token =
            localStorage.getItem(
                'integracao_token'
            );

        if (token) {

            await fetch(
                `${API_URL}/api/progresso/reiniciar`,
                {
                    method: 'POST',

                    headers: {
                        'Authorization':
                            `Bearer ${token}`
                    }
                }
            );

        }

    } catch (erro) {

        console.error(
            'Erro ao reiniciar progresso no servidor:',
            erro
        );

    }

    estado.etapaAtual = 1;
    estado.parteAtual = 0;
    estado.maiorEtapa = 1;

    partesLiberadas = {};

    localStorage.setItem(
        'integracao_partes_liberadas',
        '{}'
    );

    salvarEstado();

    fecharModalReset();

    init();
}

// =====================================================
//              MENU MOBILE
// =====================================================

function alternarMenuMobile() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.menu-overlay-mobile');

    if (!sidebar || !overlay) return;

    const aberto = sidebar.classList.contains('menu-mobile-aberto');

    if (aberto) {
        fecharMenuMobile();
    } else {
        sidebar.classList.add('menu-mobile-aberto');
        overlay.classList.add('menu-mobile-aberto');
    }
}

function fecharMenuMobile() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.menu-overlay-mobile');

    if (!sidebar || !overlay) return;

    sidebar.classList.remove('menu-mobile-aberto');
    overlay.classList.remove('menu-mobile-aberto');
}

async function cadastrarColaborador(event) {
    event.preventDefault();

    const nome = document.getElementById('admin-nome').value.trim();
    const email = document.getElementById('admin-email').value.trim();
    const senha = document.getElementById('admin-senha').value;

    const mensagem = document.getElementById('admin-mensagem');
    const botao = document.querySelector('#form-cadastro-colaborador button');

    mensagem.style.display = 'none';
    mensagem.textContent = '';

    botao.disabled = true;
    botao.textContent = 'CADASTRANDO...';

    try {
        const token = localStorage.getItem('integracao_token');

        if (!token) {
            throw new Error('Sessão do administrador não encontrada.');
        }

        const resposta = await fetch(
            `${API_URL}/api/progresso`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha: senha,
                    perfil: 'colaborador'
                })
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                dados.erro || 'Não foi possível cadastrar o colaborador.'
            );
        }

        mensagem.textContent = '✅ Colaborador cadastrado com sucesso.';
        mensagem.style.color = 'green';
        mensagem.style.display = 'block';

        document.getElementById('form-cadastro-colaborador').reset();

    } catch (erro) {

        console.error('Erro ao cadastrar colaborador:', erro);

        mensagem.textContent = '❌ ' + erro.message;
        mensagem.style.color = 'red';
        mensagem.style.display = 'block';

    } finally {

        botao.disabled = false;
        botao.textContent = 'CADASTRAR COLABORADOR';
    }
}

iniciarSistema();
