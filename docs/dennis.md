# Week 1 conceping

We zijn begonnen met de debrief bij Jurjen. Daar hebben we informatie gekregen over de case en zijn we er iets verder ingedoken.

De eerste week zijn Folkert en ik bezig geweest om het eerste prototype in adobe XD te maken. Daarnaast hebben we gezameklijk beslist welke tech stack er gebruikt gaat worden.

Aangezien onze leerdoelen grotendeels gefocused waren op het eind product maken dan daadwerkelijk in eerste instantie een specifieke skill willen leren. Gekozen voor een Vue.js applicatie die aangestuurd wordt door Nuxt.js waar we de mogelijkheid hebben om alles server side te renderen. En voor de verandering om altijd maar een rest API te gebruiken zijn we gegaan voor de graphQL techstack.

Voornamelijk deze week hebben we het prototype gemaakt dat te vinden is hier:

[Client app wireframes](https://xd.adobe.com/view/200df57a-f938-47e7-62e4-16f374a24c3d-563c/)

[Dashboards app wireframes](https://xd.adobe.com/view/200df57a-f938-47e7-62e4-16f374a24c3d-563c/)

Paralel daar aan ben ik begonnen met een beetje begonnen met het design. Niet direct de intentie van de minor maar het moet wel gewoon gebeuren. Ik ben er zelf niet zo heel fan van maar ik vond het wel tof om het op mij te pakken. De designs kunnen gevonden worden [hier](https://xd.adobe.com/view/d8fefb67-82e1-4668-4793-bfec8d2599a8-aecf/). Ik ben zeer tevreden over wat ik gemaakt heb en het is leuk om te zien dat uiteindelijk alles ook gebruikt wordt.

# Week 2

We zijn verder gegaan met het ontwerp en de feedback gepitched bij Jurjen. Hij vond het tof dat we ook het dashboard er in hadden gedaan. Verder waren we goed op weg en hij miste nog wel een beetje het snel klikken van vragen. Dat idee hebben van Robin en Jim geleend en daarop hebben we onze eige variatie gemaakt.

Folkert-Jan van der Pol en ik hebben gezeten met Joop en Matthias van de visual minor om te kijken of er nog kleine dingetjes aangepast konden worden. Hier kwamen een aantal inzichten naar boven.

- Je bent natuurlijk op je telefoon bezig dus er is niet zoveel ruimte, en het volledige scherm gebruiken
- Maar ook veel positieve reacties dat alle components er goed uitzagen en een consistentie vormen

Aansluitelijk van de feedback hebben we gekeken hoe we voor de gebruikers op de telefoon alles een tikkeltje kunnen vergroten.

Aan het eind van de week hebben we de repository opgezet, gezamelijk hebben Folkert en ik gekeken wat we nou eigenlijk allemaal willen. Daarop hebben we een folder structuur gemaakt en gekeken hoe we alle CSS and JavaScript willen gebruiken en welke code standards.

We hebben gekozen om SASS te gebruiken waarop we variablen en mixins in globale variabelen hebben gezet. Daarop zijn ze makkelijk in alles te bereiken. Ook waren we van mening dat alles in components opgebouwd moest worden. Zo kunnen we makkelijk als het ware een pagina in elkaar klikken.

Hier hebben we wel onderscheid gemaakt tussen het `dashboard`, `client` en `shared`. Alles wordt hier in gebundeld alle CSS die nodig is voor het specifieke component.

Een component ziet er ongeveer zo uit.

```js
<template>
  <blockquote class="chat-bubble" :class="'chat-bubble__' + context">
    <div class="chat-bubble__bubble">
      <p class="chat-bubble__text">
        <slot></slot>
      </p>
    </div>
    <span class="chat-bubble__time">{{time}}</span>
  </blockquote>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      default: 'No time'
    },
    context: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';

.chat-bubble {
  display: flex;
  flex-direction: column;
  &__bubble {
    padding: $padding-m;
    max-width: 80%;
    margin-bottom: $margin-xs;
  }
  &__text {
    margin: 0;
  }
  &__time {
    margin-bottom: $padding-l;
    font-size: 0.8rem;
  }
  &__operator {
    .chat-bubble {
      &__bubble {
        border-radius: $rounding-s $rounding-s $rounding-s 0;
        background-color: $color-white;
        @include shadow(1rem);
      }
      &__text {
        color: $color-grey-dark;
      }
    }
  }
  &__user {
    .chat-bubble {
      &__bubble {
        border-radius: $rounding-s $rounding-s 0 $rounding-s;
        align-self: flex-end;
        @include linear-gradient($color-primary);
        @include shadow(1rem, $color-primary, 0.5);
      }
      &__text {
        color: $color-white;
      }
      &__time {
        align-self: flex-end;
      }
    }
  }
}
</style>
```

Ik bespaar het dat ik alle componenten in dit document te plakken maar zoals je misschien kan zien:

- Een mix van SASS variablen en mixins om overal te zelfde styling toe te passen
- BEM methodiek om te stylen
- Data kan door gegeven worden met properties vanuit de pagina waar alle logica van de data afgevangen wordt
- In de repo in de map **~/client/components** zijn ze allemaal te vinden

# Week 3

Vooral componenten gemaakt en begonnen ze in elkaar te zetten dat er logica bij komt kijken. Zodra je als gebruiker daadwerkelijk door het prototype kan klikken. Dingen zoals een lokale store per actieve sessie waar data in opgeslagen wordt. Deze week zijn voornamelijk componenten maken, twweaken en data toevoegen zoals benoemd.

ik heb Koop gezeten en gereflecteerd op mijn werk, eigenlijk kwam er uit dat we eigenlijk best wel lekker bezig waren. Zonder eigenlijk al te veel voorvallen werken we lekker door. Eigenlijk pakken we onbewust constant dingen op dat er moet gebeuren. We overleggen even in de ochtend wat er moet gebeuren en dan gaan we gewoon aan de slag. En dan zien we weer in de middag wat er af is. En anders zijn het zorgen voor morgen en dan komt het dan ook wel weer goed. Die methodiek werkt eigenlijk best wel goed voor ons. Als 1 iemand iets niet snapt of even moet overleggen kan dat gewoon besproken worden en kunnen we daarna verder.

# Week 4

Het in elkaar klikken van de client ging goed, maar het was wel tijd dat er gecommuniceert ging worden met graphql om zo up-to date data te vergaren en die te tonen aan de gebruiker. Waaronder de websockets en de meldingen. Het is wel tof je kan nu heel makkelijk inhaken op de sockets.

De eerste handelingen gemaakt aan het contentieus intergratie van de website. Zodat we niet constant de website handmatig online moeten updaten. Hiervoor heb ik een combinatie gemaakt die via github op codeship de repository binnenhaalt en automatisch deployed naar mijn eigen ingerichte Ubuntu 18.04 server waar ik 2 node servers parallel van elkaar kan laten draaien. Zo kan de server communiceren met de client in zijn eigen afgeschermde omgeving.

Ik heb dit een half jaar geleden ongeveer ook gedaan dus het was even weer zoeken hoe en wat maar uiteindelijk naar toch wel flink iteren en proberen en constant nieuwe builds draaien is het gelukt.

Ik heb ook nog met Koop gezeten om te kijken hoe en wat. Eigenlijk kwam er uit dat we nog steeds lekker bezig gaan maar dat ik mijn posistie niet zo snel in de groep snap. Ik voel mij een beetje vliegende keep terwijl ik volgens mij best redelijk wat werk verzet. Maar aan de andere kant het gaat nog steeds goed dus ben de laatste persoon die zou klagen.

![codeship](/docs/images/dennis/codeshiplol.png)

Mijn setup commands zijn om te testen of we geen verkeerde build op de server zetten:

```bash
cd server
yarn
cd -
cd client
yarn
cd -
```

Waar uiteindelijk de deployment gedaan wordt via na ongeveer 15 keer iteren:

```bash
rsync -avz --no-perms --delete -e "ssh" --progress ./ root@188.166.37.160:/home/laadpalen-app --exclude=/client/modules/config.js --exclude=/server/.env
rsync -avz --no-perms -e "ssh" --progress ./ root@188.166.37.160:/home/laadpalen-app
ssh root@188.166.37.160 "cd /home/laadpalen-app/client && yarn install"
ssh root@188.166.37.160 "cd /home/laadpalen-app/client && yarn run build"
ssh root@188.166.37.160 pm2 restart laadpalen-client
ssh root@188.166.37.160 pm2 restart laadpalen-server
```

Het werkt echt heel nice en hebben daadwerkelijk de laatste versie van de master online staan zonder er ook maar 1 moment over na te hoeven denken.

# Week 5

Op dit moment de laatste puntjes op de i zetten. Deze week ben ik begonnen met de contentieus intergratie regelen dat alles wat op de master staat gelijk online komt aangezien er hier en daar nog niet wat dingen lekker liepen.

Ook de kleine dingen die met het testen naar voren komen dat de uiteindelijk op bepaalde telefoons niet helemaal lekker werkt. Ook bleek de data online kapot te zijn en waren er nog wat kleine apache issues in de server. Helaas is dev-ops niet direct mijn vakgebied, het is mij nog steeds niet helemaal duidelijk hoe dat kan. Gelukkig bestaat er voor alles een oplossing

Gelukkig zijn zulke dingen heel makkelijk op te lossen door verschillende environment variablen te gebruiken of je een productie of develop build aan het draaien bent op je machine.

Ook vooral de laatste handelingen aan de documentie zijn in deze week getyped. Alles komt wel snel samen en het is een korte samenvatting wat we nou eigenlijk gedaan hebben. We zijn zo bezig geweest dat eigenlijk alles gewoon lekker liep en iedereen pakte goed zijn dingen op.

# Reflectie

**Wat wil ik nog leren**

- Contact tussen client, server, en source is elegant opgezet, bijvoorbeeld door OAuth of goede security in te zetten. Opzet getuigd van inzicht in de uitdagingen die bij simultaan gebruik door meerdere gebruikers komen kijken.

- Het datamodel is op een slimme manier opgezet die van dieper inzicht getuigd. Je hebt een datamodel gecreëerd dat nauw aansluit op jouw app en data

* Je hebt methodes gecreëerd die clients in staat stelt middels jouw eigen API te communiceren met jouw server. Real time connectiviteit is op een slimme manier opgezet

* Je geeft zodanig feedback op de juiste momenten, dat de user experience er beter van wordt

Eigenlijk is het best wel dubbel want de intentie van dit project wat direct om mijn leerdoelen te vervullen. Voornamelijk om een tof prototype te maken en te leren van de andere twee. Ik denk dat ik daar echt het aller meest aan heb gehad, het denk process en hoe andere naar relatief simpel maar ook moeilijke problemen kijken. En we hadden een attitude binnen de groep dat niks eigenlijk echt onmogelijk is als je maar genoeg inspanning levert.

Dat was echt heel tof om dan nu met een product te staan waar je je hart en ziel ingestoken hebt om iets vets te maken. Een tech stack op industrie level uitgekozen en maar gewoon het voor elkaar boksen om een prototype te maken. Under the hood is er zo goed nagedacht over alles en ik denk niet zo snel dat er ook maar 1 component is waar we de kantjes er van afgelopen hebben.

Zelf is het vooral een verbreding van mijn kennis dat ik al wist, ik heb niet direct echt iets compleets nieuws geleerd. Misschien had ik zelf wel iets meer willen doen met GraphQL op de server maar je kan niet alles behandelen. Achteraf dacht ik, oh dat vind ik ook wel interessant maar nog genoeg tijd in mijn leven om dit uit te zoeken.

Als ik moet reflecteren op de leerdoelen die ik heb gesteld. Denk ik dat alles eigenlijk er best goed vanaf gebracht is. Alles zit er in en heb onbewust toch veel rekening gehouden met alles. Alleen omdat we zoveel kleine dingen hebben opgepakt is het helemaal moeilijk om een vinger te leggen om wat ik nou precies concreet gedaan heb.
