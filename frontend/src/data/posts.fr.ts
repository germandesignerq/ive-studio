import type { PostSlug, PostText } from './posts'

/** Французские тексты статей. Апострофы — типографские (’), чтобы не рвать строки. */
export const postsFr: Record<PostSlug, PostText> = {
  'landing-page-design-problem': {
    title: 'Votre landing page n’a pas un problème de design',
    categoryLabel: 'Conversion',
    excerpt:
      'Nous avons audité onze pages qui convertissaient à moins de 1 %. Dix d’entre elles étaient très bien. Le problème était toujours le même, et jamais la section hero.',
    coverCaption: 'Onze audits, un schéma récurrent.',
    body: [
      {
        kind: 'p',
        text: 'Toutes les deux ou trois semaines, quelqu’un nous envoie un lien avec la même phrase : **« le site est superbe, mais personne ne s’inscrit ».** Le trimestre dernier, nous avons mené onze audits de ce type. Deux des pages avaient réellement besoin d’une refonte. Les neuf autres allaient bien — typographie propre, hiérarchie correcte, vitesse suffisante.',
      },
      {
        kind: 'p',
        text: 'Le schéma que nous retrouvions n’avait rien à voir avec l’apparence de la page.',
      },

      { kind: 'h2', text: 'La page répondait à la mauvaise question' },
      {
        kind: 'p',
        text: 'Presque chaque page peu performante que nous ouvrions était construite pour répondre à **« qu’est-ce que ce produit ? »**. Le visiteur, lui, arrivait avec une tout autre question : **« est-ce fait pour quelqu’un comme moi, et que se passe-t-il si je clique ? »**',
      },
      {
        kind: 'p',
        text: 'Ce sont deux pages différentes. La première explique des fonctionnalités. La seconde lève des doutes. Quand vous écrivez la première en attendant l’effet de la seconde, la conversion stagne à 1 % et aucun dégradé n’y changera rien.',
      },
      {
        kind: 'quote',
        text: 'Personne ne quitte votre site parce que vos marges étaient mal réglées. On le quitte parce qu’on n’a pas pu savoir si c’était fait pour soi.',
      },

      {
        kind: 'fact',
        title: 'L’apparence est jugée en 50 millisecondes',
        text: 'Lindgaard et ses collègues ont montré des pages web pendant seulement 50 ms en demandant d’en noter l’attrait visuel. Les notes correspondaient étroitement à celles données après 500 ms — et restaient stables lors de la répétition du test. En 50 ms, rien n’est lu ni comparé : ce qui s’imprime, c’est la couleur, la densité, l’imagerie et la typographie. Ce verdict tombe bien avant que votre texte n’ait son tour, et c’est précisément pour cela que le texte doit porter le reste.',
        source: {
          label: 'Lindgaard et al., Behaviour & Information Technology, 2006',
          url: 'https://www.tandfonline.com/doi/abs/10.1080/01449290500330448',
        },
      },

      { kind: 'h2', text: 'Trois choses que nous changeons en premier' },
      {
        kind: 'p',
        text: 'Avant de toucher à la mise en page, nous avons réécrit les trois mêmes endroits sur chaque page. Dans la plupart des cas, cela seul a suffi à faire bouger le chiffre et à justifier l’audit.',
      },

      { kind: 'h3', text: '1. Le sous-titre nomme le lecteur' },
      {
        kind: 'p',
        text: 'Les titres captent toute l’attention et l’essentiel du budget. C’est la ligne en dessous qui fait le vrai travail : elle dit à qui cela s’adresse et ce que cela change. « Analytics pour les équipes » devient « Voyez quelles publicités vous rapportent vraiment, sans analyste de données ».',
      },

      { kind: 'h3', text: '2. Le bouton dit ce qui va se passer' },
      {
        kind: 'p',
        text: '« Commencer » n’est pas une promesse, c’est un haussement d’épaules. « Démarrer gratuitement — sans carte » est une promesse. Les gens hésitent devant un bouton bien plus longtemps que les designers ne l’imaginent, et son libellé est la seule information dont ils disposent à cet instant.',
      },

      { kind: 'h3', text: '3. La première objection apparaît au-dessus de la ligne de flottaison' },
      {
        kind: 'p',
        text: 'Chaque produit a une question qui bloque net : le prix, le temps d’installation, l’engagement, la migration. L’enterrer trois sections plus bas ne retarde pas le doute — cela envoie simplement le lecteur chercher la réponse chez un concurrent.',
      },

      {
        kind: 'fact',
        title: 'Ce qui est beau paraît utilisable — que ce soit vrai ou non',
        text: 'Kurosu et Kashimura ont testé 26 variantes d’une interface de distributeur automatique auprès de 252 participants. L’attrait perçu d’une mise en page prédisait bien mieux la facilité d’usage supposée que la facilité réelle. Une belle apparence vous achète de la patience et de la confiance. Elle ne vous achète pas une décision — celle-ci vient toujours de ce que la page dit.',
        source: {
          label: 'Kurosu & Kashimura, CHI ’95 — synthèse NN/g',
          url: 'https://www.nngroup.com/articles/aesthetic-usability-effect/',
        },
      },

      { kind: 'h2', text: 'Ce que nous ne recommandons plus' },
      {
        kind: 'list',
        items: [
          '**Des pages plus longues.** Ajouter des sections à une page que personne ne termine donne l’impression d’avancer, pas de convertir.',
          '**La preuve sociale sans détails.** « Adoré par des milliers de clients » se lit comme une décoration. Une phrase de client avec un chiffre se lit comme une preuve.',
          '**L’animation sur le chemin principal.** Une apparition de 400 ms entre le lecteur et le bouton d’inscription coûte plus qu’elle n’apporte.',
        ],
      },

      { kind: 'h2', text: 'Alors, quand est-ce vraiment du design ?' },
      {
        kind: 'p',
        text: 'Deux des onze pages avaient bien besoin d’être reconstruites — c’étaient deux tableaux de bord produit déguisés en sites marketing, avec une navigation que personne ne parvenait à décoder. Ça, c’est un vrai problème de design, et aucune retouche de texte ne le sauve.',
      },
      {
        kind: 'p',
        text: 'Mais si votre page est lisible, se charge vite et convertit malgré tout à moins de 1 %, commencez par les mots. Ils sont moins chers à changer, et ils vous diront quoi redessiner.',
      },
    ],
  },

  'design-system-nobody-maintains': {
    title: 'Le design system que personne ne maintient',
    categoryLabel: 'Processus',
    excerpt:
      'Trois mois de travail sur les composants, abandonnés en cinq semaines. Voici ce que nous faisons différemment aujourd’hui, et pourquoi la documentation n’a jamais été le problème.',
    coverCaption: 'Vu de l’intérieur, tout système abandonné se ressemble.',
    body: [
      {
        kind: 'p',
        text: 'Nous avons désormais vu mourir quatre design systems. Des entreprises différentes, des outils différents, la même autopsie : une belle bibliothèque, un site de documentation que personne n’ouvrait, et une équipe produit qui construisait tranquillement ses composants à côté.',
      },
      {
        kind: 'p',
        text: 'L’explication habituelle est **« nous n’avons pas eu le temps de le documenter ».** Nous n’y croyons plus. Chacun de ces systèmes avait une documentation. Ce qui leur manquait, c’était une raison de continuer à s’en servir un mardi difficile.',
      },

      { kind: 'h2', text: 'Un système construit à l’écart est une proposition, pas un système' },
      {
        kind: 'p',
        text: 'Ceux qui ont échoué ont tous été construits de la même façon : un designer disparaissait deux ou trois mois, puis présentait une bibliothèque terminée. Elle était complète, cohérente, et complètement déconnectée des écrans que l’équipe livrait réellement ce trimestre-là.',
      },
      {
        kind: 'p',
        text: 'La première fois qu’une vraie fonctionnalité a eu besoin de quelque chose que la bibliothèque n’avait pas, quelqu’un a fait une exception. La deuxième exception a pris dix minutes à justifier. À la cinquième, la bibliothèque était un musée.',
      },
      {
        kind: 'quote',
        text: 'Un composant pour lequel personne n’a eu à se battre est un composant que personne ne défend.',
      },

      {
        kind: 'fact',
        title: 'Nous surestimons ce que nous avons construit nous-mêmes',
        text: 'Norton, Mochon et Ariely l’ont appelé l’effet IKEA : on accorde une valeur disproportionnée aux choses que l’on a assemblées soi-même, même mal. Cela explique les deux moitiés du problème. L’auteur du système ne comprend pas pourquoi on s’en écarterait — et le développeur qui a codé son propre menu déroulant au dernier sprint y est sincèrement attaché. La propriété partagée n’est pas un confort ici. C’est le mécanisme.',
      },

      { kind: 'h2', text: 'Ce que nous faisons à la place' },
      {
        kind: 'list',
        items: [
          '**Construire à partir d’écrans réels.** Aucun composant n’entre dans la bibliothèque avant d’être apparu à deux endroits différents du produit réel. La deuxième apparition prouve que c’est un motif et non un cas isolé.',
          '**Nommer un responsable par section.** Pas un comité. Une personne que l’on sollicite quand un bouton a besoin d’un nouvel état.',
          '**Budgéter la maintenance à voix haute.** Nous chiffrons le travail de design system comme une ligne récurrente, pas comme un livrable ponctuel. Un système sans budget de maintenance a une date de décès programmée, et tout le monde devrait le savoir.',
          '**Faire du raccourci le bon chemin.** Si aller chercher dans la bibliothèque est plus lent que copier-coller une div, la bibliothèque perd. À chaque fois.',
        ],
      },

      { kind: 'h2', text: 'La documentation, ce sont les derniers 10 %' },
      {
        kind: 'p',
        text: 'Nous l’écrivons toujours. Mais après que le système a survécu au contact de trois ou quatre fonctionnalités, et nous la plaçons là où les développeurs vivent déjà — dans le dépôt, pas sur un site séparé qui demande un second identifiant.',
      },
      {
        kind: 'p',
        text: 'Le seul des quatre systèmes encore vivant deux ans plus tard a la pire documentation du lot. Il a aussi deux responsables nommés, une heure bloquée chaque mois pour le nettoyage, et une règle : les nouveaux composants arrivent avec la fonctionnalité qui les a rendus nécessaires. Cela a compté davantage que n’importe quelle page de recommandations.',
      },
    ],
  },

  'stop-testing-onboarding-on-designers': {
    title: 'Arrêtez de tester l’onboarding sur des designers',
    categoryLabel: 'UX',
    excerpt:
      'Votre équipe sait où se trouve chaque chose. C’est exactement pour cela qu’elle est la plus mal placée pour valider une première prise en main.',
    coverCaption: 'La première utilisation n’arrive qu’une fois par personne.',
    body: [
      {
        kind: 'p',
        text: 'Il existe un type de réunion bien particulier : une équipe parcourt son propre onboarding, convient que tout est clair, et le met en ligne. Deux semaines plus tard, l’activation n’a pas bougé et personne ne sait dire pourquoi.',
      },
      {
        kind: 'p',
        text: 'La raison est banale : **on ne peut pas désapprendre son propre produit.** Une fois que vous savez que le compte doit être créé avant l’espace de travail, chaque écran qui le rappelle paraît redondant. Pour un nouvel utilisateur, c’est la seule chose qui tient le parcours ensemble.',
      },

      { kind: 'h2', text: 'La malédiction du savoir, en pratique' },
      {
        kind: 'p',
        text: 'Les designers et les développeurs ne savent pas seulement plus que le nouvel utilisateur. Ils connaissent une autre forme du produit. Ils pensent en objets — espace de travail, projet, membre. Les nouveaux utilisateurs pensent en intentions : « je veux voir si ce truc sait faire X avant d’inviter mon patron ».',
      },
      {
        kind: 'p',
        text: 'Quand ces deux modèles s’opposent, c’est en général l’interface qui gagne la discussion, et l’utilisateur qui s’en va.',
      },

      {
        kind: 'fact',
        title: 'Cinq inconnus valent mieux que cinq collègues',
        text: 'Nielsen et Landauer ont modélisé la façon dont les problèmes d’utilisabilité apparaissent à mesure que l’on ajoute des testeurs : avec un taux de détection moyen d’environ 31 % par personne, cinq utilisateurs révèlent à peu près 85 % des problèmes d’un design. La nuance mérite d’être connue : sur une centaine de tests à cinq personnes, la fourchette réelle allait d’environ 55 % à 95 %, selon les personnes recrutées. Cinq suffisent pour commencer. Cinq mauvaises personnes valent toujours zéro.',
        source: {
          label: 'Nielsen & Landauer, 1993 — expliqué par NN/g',
          url: 'https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/',
        },
      },

      { kind: 'h2', text: 'À quoi ressemble un test de première prise en main utile' },
      {
        kind: 'list',
        items: [
          '**Recrutez selon le profil d’acheteur, pas selon le budget.** Un ami d’un autre service est pratique et sans valeur. Il vous fait déjà confiance.',
          '**Donnez un objectif, pas un script.** « Allez jusqu’au point où vous sauriez si cela vaut la peine de payer. » Puis taisez-vous.',
          '**Observez où ils cessent de parler.** Le silence et la relecture sont le signal. Les gens annoncent rarement leur confusion ; ils ralentissent, simplement.',
          '**Testez l’état vide.** La plupart des démos d’onboarding tournent avec des données de test. Les vrais comptes s’ouvrent sur du vide, et cet écran persuade davantage que n’importe quelle visite guidée.',
        ],
      },

      {
        kind: 'quote',
        text: 'Si vous devez expliquer le parcours avant le début du test, vous avez déjà trouvé le problème.',
      },

      { kind: 'h2', text: 'Une habitude qui vaut la peine d’être volée' },
      {
        kind: 'p',
        text: 'Nous demandons à chaque nouvelle recrue de s’inscrire au produit du client dès son premier jour, seule, en enregistrant son écran. Elle ne sera plus jamais aussi ignorante — et cette ignorance est ce qu’elle possède de plus précieux pendant environ quarante minutes.',
      },
      {
        kind: 'p',
        text: 'Ces enregistrements ont révélé plus de problèmes d’onboarding que tous les ateliers que nous avons animés.',
      },
    ],
  },

  'six-weeks-or-it-never-ships': {
    title: 'Six semaines, sinon ça ne sort jamais',
    categoryLabel: 'Processus',
    excerpt:
      'Chaque projet mené au-delà de six semaines a perdu son élan quelque part au milieu. Nous avons donc cessé d’en vendre de plus longs.',
    coverCaption: 'Le milieu d’un long projet est l’endroit où les projets meurent.',
    body: [
      {
        kind: 'p',
        text: 'Nous vendions autrefois des missions de trois mois. Sur le papier, elles étaient plus rentables et plus faciles à staffer. Elles ont aussi produit nos deux seuls clients réellement mécontents, et les deux fois, les ennuis ont commencé exactement au même endroit : la semaine six.',
      },
      {
        kind: 'p',
        text: 'Non pas parce que quelque chose s’était cassé. Parce que rien ne se passait. La semaine six est le moment où un long projet cesse de paraître urgent à tout le monde.',
      },

      {
        kind: 'fact',
        title: 'Le travail s’étale jusqu’à remplir le temps disponible',
        text: 'Cyril Northcote Parkinson l’a écrit comme une plaisanterie dans The Economist en 1955, et cela a survécu à la plupart des théories sérieuses du management. La version pratique pour le design : une décision qui doit être prise ce jeudi prend un après-midi. La même décision avec un mois devant elle prend un mois — et donne une réponse légèrement moins bonne, parce qu’elle collecte des avis pendant tout ce temps.',
      },

      { kind: 'h2', text: 'Ce qui déraille vraiment' },
      {
        kind: 'p',
        text: 'Les longs projets échouent au ralenti, et toujours par les trois mêmes portes.',
      },
      {
        kind: 'list',
        items: [
          '**Le périmètre s’élargit, poliment.** Personne ne demande une refonte. On demande onze fois « juste un état de plus ».',
          '**Le décideur s’éloigne.** Le fondateur présent à chaque appel la première semaine transmet désormais des captures d’écran à quelqu’un qui n’y était pas.',
          '**L’équipe ne sent plus l’échéance.** Une date à douze semaines n’est pas une échéance, c’est une prévision météo.',
        ],
      },

      { kind: 'h2', text: 'Six semaines, et c’est le périmètre qui plie' },
      {
        kind: 'p',
        text: 'La solution n’était pas de travailler plus vite. C’était de figer la date et de laisser bouger le périmètre. Nous vendons désormais des blocs de six semaines avec une fin ferme et une liste hiérarchisée de ce qui entre dedans. Quand une demande arrive en cours de route, elle ne repousse pas la date — elle éjecte l’élément le moins prioritaire.',
      },
      {
        kind: 'quote',
        text: 'Une date fixe avec un périmètre souple livre. Un périmètre fixe avec une date souple négocie.',
      },
      {
        kind: 'p',
        text: 'Les clients contestent ce principe exactement une fois, en général la première semaine. Puis quelque chose est coupé, le site sort le jour promis, et l’élément coupé se révèle avoir été optionnel depuis le début. Cette conversation a eu lieu assez souvent pour que nous l’ayons désormais en amont.',
      },

      { kind: 'h2', text: 'Ce que six semaines vous apportent' },
      {
        kind: 'p',
        text: 'Découverte en semaine une. Design des semaines deux à quatre, avec un lien live dès le premier vendredi. Développement et durcissement en cinq et six. Tout ce que le client voit est réel et cliquable dès la deuxième semaine, ce qui signifie que les débats ont lieu tant qu’ils sont encore peu coûteux.',
      },
      {
        kind: 'p',
        text: 'Les produits plus ambitieux demandent évidemment plus de six semaines. Simplement, ils ne demandent pas un bloc de six semaines — ils en demandent trois, chacun avec sa propre date de fin et son propre résultat livrable. C’est le rythme qui compte, pas la durée totale.',
      },
    ],
  },

  'pricing-pages-are-product-design': {
    title: 'Les pages de tarifs relèvent du design produit, pas du marketing',
    categoryLabel: 'Business',
    excerpt:
      'La page où l’on décide de vous payer est traitée comme une brochure. Nous en avons reconstruit une comme une surface produit : les essais ont augmenté de 27 %.',
    coverCaption: 'L’écran à plus forte intention d’achat de la plupart des sites.',
    body: [
      {
        kind: 'p',
        text: 'Sur la plupart des sites, la page de tarifs concentre la plus forte intention d’achat et la moindre attention au design. Elle est écrite par le marketing, relue par la finance, et construite en dernier. C’est pourtant la seule page où le visiteur a déjà décidé qu’il voulait le produit et se demande maintenant s’il peut faire confiance au chiffre.',
      },
      { kind: 'p', text: 'Ce n’est pas une brochure. C’est une interface de décision.' },

      { kind: 'h2', text: 'Trop de formules, ce n’est pas de la générosité' },
      {
        kind: 'p',
        text: 'Ce que nous retirons le plus souvent, c’est une formule. Les équipes ajoutent des paliers pour capter chaque segment, et chacun ajoute une comparaison que le visiteur doit désormais effectuer.',
      },

      {
        kind: 'fact',
        title: 'Plus d’options, décisions plus lentes',
        text: 'La loi de Hick — issue des travaux de Hick en 1952 et de Hyman en 1953 — établit que le temps de décision croît avec le nombre et la complexité des options, de façon à peu près logarithmique. Ce n’est pas un permis de tout réduire à un seul bouton. C’est un rappel : chaque colonne supplémentaire est un coût payé par chaque visiteur, que cette colonne le concerne ou non.',
        source: { label: 'Loi de Hick — Laws of UX', url: 'https://lawsofux.com/hicks-law/' },
      },

      { kind: 'h2', text: 'Ce que nous changeons en premier' },
      {
        kind: 'list',
        items: [
          '**Une formule recommandée, visiblement recommandée.** Non par ruse, mais parce qu’une comparaison sans guide est un travail pour lequel le visiteur ne s’est pas porté volontaire.',
          '**Des noms de fonctionnalités dans les mots de l’acheteur.** « Sièges illimités » est une fonctionnalité. « Toute votre équipe, sans calcul par personne » répond à ce qui l’inquiétait vraiment.',
          '**L’objection à côté du prix.** Durée d’engagement, ce qui se passe après l’essai, carte bancaire requise ou non. Chacune de ces questions sans réponse envoie les gens la chercher chez un concurrent.',
          '**Une sortie visible.** Des conditions de résiliation et de rétrogradation énoncées clairement augmentent les inscriptions. C’est la réversibilité qui rend une décision peu coûteuse.',
        ],
      },

      {
        kind: 'quote',
        text: 'Les gens n’abandonnent pas une page de tarifs parce que c’est trop cher. Ils l’abandonnent parce qu’ils n’arrivent pas à savoir ce qui va se passer ensuite.',
      },

      {
        kind: 'fact',
        title: 'La formule que personne n’achète travaille quand même',
        text: 'Dan Ariely a popularisé un cas tiré de The Economist : une offre d’abonnement où une option papier seule, que personne ne choisissait, rendait l’offre papier + web manifestement évidente. Retirez l’option non désirée et les préférences se déplacent. Les ancrages et les leurres sont réels et opèrent déjà sur votre page — la seule question est de savoir si vous les avez disposés délibérément ou par hasard.',
      },

      { kind: 'h2', text: 'Les 27 %' },
      {
        kind: 'p',
        text: 'Sur la refonte que nous citons souvent, les essais ont progressé de 27 % sans changement de prix. Nous avons supprimé une quatrième formule, déplacé le sélecteur annuel/mensuel au-dessus des cartes plutôt qu’en dessous, réécrit neuf libellés de fonctionnalités et placé la mention « sans carte bancaire » dans la zone du bouton plutôt qu’en note de bas de page.',
      },
      {
        kind: 'p',
        text: 'Rien de tout cela n’est du texte marketing. Tout cela est du design d’interface appliqué au moment où quelqu’un décide de vous payer.',
      },
    ],
  },

  'what-we-ask-before-we-quote': {
    title: 'Ce que nous demandons avant de chiffrer',
    categoryLabel: 'Business',
    excerpt:
      'Neuf questions. Si un client ne peut en répondre à quatre, l’estimation sera fausse et les deux parties seront mécontentes dès la troisième semaine.',
    coverCaption: 'Une estimation ne vaut que les questions qui la précèdent.',
    body: [
      {
        kind: 'p',
        text: 'Un studio qui chiffre vite paraît réactif. C’est aussi ainsi que l’on finit par reconstruire trois fois la même page gratuitement. Nous refusons désormais d’avancer un chiffre tant que nous n’avons pas les réponses à neuf questions, et nous le disons dès le premier appel.',
      },

      {
        kind: 'fact',
        title: 'Tout le monde sous-estime, nous compris',
        text: 'Kahneman et Tversky ont nommé en 1979 le biais de planification : on prévoit la durée de son propre travail d’après la façon dont il devrait se dérouler, en ignorant la façon dont un travail comparable s’est réellement déroulé. Le remède n’est pas de gérer l’optimisme. C’est de poser des questions dont les réponses sont des faits sur le passé plutôt que des espoirs sur l’avenir.',
      },

      { kind: 'h2', text: 'Les neuf' },
      {
        kind: 'list',
        items: [
          '**Qui valide ?** Un nom. Si la réponse est une liste, le calendrier a un problème avant même de commencer.',
          '**Que faudra-t-il constater le jour du lancement pour que cela en ait valu la peine ?** La réponse constitue le vrai brief.',
          '**Que mesurez-vous aujourd’hui ?** Si rien, le premier livrable est l’analytique, pas le design.',
          '**D’où viennent les contenus ?** Les textes livrés en retard sont de loin la première cause de date manquée.',
          '**Qu’est-ce qui existe déjà ?** Marque, design system, bibliothèque de composants, CMS. La moitié du chiffrage consiste à découvrir ce que vous n’aurez pas à construire.',
          '**Qui reprend après nous ?** Une équipe qui hérite du code a besoin d’une autre passation qu’une équipe qui n’y touchera jamais.',
          '**Qu’avez-vous déjà essayé ?** La tentative ratée est souvent plus instructive que le brief.',
          '**Qu’est-ce qui est réellement figé ?** Date, budget ou périmètre — un des trois. Pas les trois.',
          '**Que se passe-t-il si nous ne faisons rien ?** Si la réponse honnête est « pas grand-chose », le projet perdra face à une urgence dès la troisième semaine.',
        ],
      },

      {
        kind: 'quote',
        text: 'Si quatre de ces questions restent sans réponse, nous ne chiffrons pas un projet. Nous chiffrons une supposition.',
      },

      { kind: 'h2', text: 'Ce que nous faisons quand les réponses manquent' },
      {
        kind: 'p',
        text: 'Nous vendons alors une semaine de découverte payante. Elle est courte, à prix fixe, et produit un périmètre que les deux parties peuvent chiffrer. Les clients qui hésitent devant une semaine de découverte n’auraient jamais été satisfaits d’un forfait bâti sur des hypothèses — et le découvrir pour le coût d’une semaine est bon marché pour tout le monde.',
      },
      {
        kind: 'p',
        text: 'Chaque projet qui s’est mal passé chez nous se ramène à une question de cette liste que nous avons laissée filer parce que le client semblait enthousiaste et que nous voulions le contrat.',
      },
    ],
  },

  'animations-costing-conversions': {
    title: 'Vos animations vous coûtent des conversions',
    categoryLabel: 'Développement',
    excerpt:
      'Nous adorons le mouvement. Nous avons aussi mesuré ce qui se passe quand une transition de 400 ms s’intercale entre l’utilisateur et le bouton d’envoi.',
    coverCaption: 'Le mouvement sur le chemin principal est un impôt sur chaque visite.',
    body: [
      {
        kind: 'p',
        text: 'Ce studio aime le mouvement. Il y a une animation en canvas sur notre propre page d’accueil. Prenez donc ceci comme un aveu plutôt que comme une leçon : l’essentiel des animations que nous avons livrées durant nos premières années coûtait de l’argent à nos clients.',
      },
      {
        kind: 'p',
        text: 'Pas les animations décoratives. Celles qui se trouvent **sur le chemin** — une apparition avant l’affichage du formulaire, une modale de 400 ms, un fondu déclenché au défilement entre le lecteur et le bouton qu’il est venu presser.',
      },

      {
        kind: 'fact',
        title: 'La limite des 400 ms',
        text: 'En 1982, Walter Doherty et Arvind Thadani ont publié chez IBM des travaux défendant l’idée que le temps de réponse d’un ordinateur devait rester sous 400 ms plutôt que les deux secondes alors admises. Sous ce seuil, productivité et satisfaction augmentaient nettement — la machine cessait d’interrompre le fil de pensée. Quatre décennies plus tard, cela reste un plafond utile : au-delà d’environ 400 ms, votre transition n’est plus une finition, c’est de la latence.',
        source: {
          label: 'Seuil de Doherty — Laws of UX',
          url: 'https://lawsofux.com/doherty-threshold/',
        },
      },

      { kind: 'h2', text: 'Ce que nous mesurons désormais' },
      {
        kind: 'p',
        text: 'Avant et après tout travail sur le mouvement, nous relevons le temps jusqu’à la première interaction avec le CTA principal — non pas le chargement de la page, mais le délai entre l’arrivée et le moment où le visiteur peut réellement agir. Deux règles en sont sorties, et nous ne les avons pas enfreintes depuis.',
      },
      {
        kind: 'list',
        items: [
          '**Rien ne s’anime entre l’utilisateur et l’action principale.** Les formulaires, les boutons et les tarifs sont là. Ils n’arrivent pas.',
          '**Les animations de retour restent sous 200 ms, les transitions sous 300 ms.** Tout ce qui est plus lent doit être justifié par écrit, juste à côté.',
        ],
      },

      {
        kind: 'quote',
        text: 'Une animation est gratuite quand elle accompagne l’utilisateur, et coûteuse dès l’instant où elle passe devant lui.',
      },

      { kind: 'h2', text: 'Les apparitions au défilement méritent une mention spéciale' },
      {
        kind: 'p',
        text: 'Le fondu au défilement est l’effet le plus copié du web et le plus facile à rater. Deux défaillances que nous voyons sans cesse : du contenu qui n’apparaît jamais parce que l’observateur ne se déclenche pas lors d’un défilement rapide, et des apparitions appliquées à un texte que le visiteur est en train d’essayer de lire.',
      },
      {
        kind: 'p',
        text: 'Notre règle : une apparition peut s’exécuter une fois, doit se terminer en moins de 800 ms, et ne doit jamais retarder ce que le visiteur est précisément venu chercher.',
      },

      { kind: 'h2', text: 'La partie accessibilité n’est pas optionnelle' },
      {
        kind: 'p',
        text: 'Le mouvement n’est pas qu’une préférence esthétique pour tout le monde. La parallaxe et les déplacements de grande ampleur peuvent provoquer nausées et vertiges chez les personnes souffrant de troubles vestibulaires. Tous les systèmes d’exploitation exposent aujourd’hui un réglage « réduire les animations », et le respecter tient en une media query.',
      },
      {
        kind: 'p',
        text: 'Si votre site ignore `prefers-reduced-motion`, une part de vos visiteurs ferme l’onglet pour des raisons que vos statistiques n’expliqueront jamais.',
      },
    ],
  },

  'dark-mode-is-not-a-feature': {
    title: 'Le mode sombre n’est pas une fonctionnalité',
    categoryLabel: 'UX',
    excerpt:
      'C’est un second design system, avec ses propres règles de contraste, ses propres bugs et son propre coût de maintenance. Décidez-le en connaissance de cause.',
    coverCaption: 'Deux thèmes signifient deux fois tout.',
    body: [
      {
        kind: 'p',
        text: 'Le mode sombre arrive dans le backlog comme une case à cocher. Il se comporte comme un embranchement. Dès que vous le livrez, vous avez deux systèmes de couleurs, deux jeux de décisions de contraste, deux séries de captures dans votre marketing, et chaque futur composant doit naître deux fois.',
      },
      {
        kind: 'p',
        text: 'Nous n’y sommes pas opposés. Ce site est sombre. Nous sommes opposés à le traiter comme un interrupteur que l’on ajoute en un sprint.',
      },

      { kind: 'h2', text: 'Inverser n’est pas concevoir' },
      {
        kind: 'p',
        text: 'La version naïve retourne la palette et considère l’affaire réglée. Puis les problèmes apparaissent : le blanc pur sur noir pur vibre, les ombres cessent de traduire l’élévation faute de quoi que ce soit à assombrir, les couleurs de marque qui chantaient sur blanc deviennent ternes, et chaque illustration à fond transparent disparaît.',
      },
      {
        kind: 'list',
        items: [
          '**L’élévation doit être reconstruite.** Les thèmes clairs élèvent les surfaces par l’ombre. Les thèmes sombres les élèvent par la clarté — plus la surface est haute, plus elle est claire.',
          '**Les couleurs de marque demandent souvent une seconde teinte.** L’accent qui passe le contraste sur blanc le passe rarement sur un noir profond.',
          '**Le noir pur et le blanc pur sont deux pièges.** Le contraste maximal produit un halo, où le texte clair bave sur le fond sombre. C’est plus marqué chez les personnes astigmates.',
          '**Les images demandent un plan.** Les PNG transparents, les captures et les logos supposent tous une couleur de fond quelque part.',
        ],
      },

      {
        kind: 'fact',
        title: 'Le seuil de contraste est un chiffre, pas une opinion',
        text: 'Les WCAG fixent 4,5:1 pour le texte courant et 3:1 pour le grand texte — et cela s’applique indépendamment aux deux thèmes. Une palette qui passe en mode clair ne dit rien du mode sombre. C’est aussi ce que nous voyons échouer le plus souvent dans un thème sombre ajouté tardivement : le texte secondaire et désactivé, où les designers choisissent un gris qui allait très bien sur blanc.',
      },

      { kind: 'h2', text: 'Le coût honnête' },
      {
        kind: 'p',
        text: 'Environ un tiers de temps de design en plus sur chaque nouveau composant, et une seconde colonne permanente dans chaque passe de recette visuelle. Voilà le vrai prix, et il vaut la peine d’être payé quand votre produit est utilisé la nuit, sur de longues sessions, ou par des développeurs — des publics qui le réclameront sincèrement.',
      },
      {
        kind: 'quote',
        text: 'Livrez un thème auquel vous avez réfléchi plutôt que deux que vous avez inversés.',
      },
      {
        kind: 'p',
        text: 'Si vous vous engagez, construisez-le dès le premier jour sur des tokens sémantiques — `surface`, `text-primary`, `border-subtle` — jamais sur des valeurs hexadécimales en dur dans les composants. Réintroduire des tokens dans une base de code aux couleurs figées est bien plus lourd que le thème lui-même.',
      },
    ],
  },

  'handoff-is-a-process': {
    title: 'La passation est un processus, pas un lien Figma',
    categoryLabel: 'Développement',
    excerpt:
      'Le résultat ne correspond jamais à la maquette quand design et développement sont deux contrats séparés. Voici la checklist que nous utilisons à la place.',
    coverCaption: 'L’écart entre le fichier et la réalisation.',
    body: [
      {
        kind: 'p',
        text: 'Le mot « passation » décrit bien le problème : quelque chose est terminé, puis lancé par-dessus le mur. Ce qui atterrit de l’autre côté est une image fixe d’un système qui devra fonctionner dans des états que l’image n’a jamais montrés.',
      },
      {
        kind: 'p',
        text: 'Les maquettes sont complètes par définition. Les produits ne le sont pas. Chaque écart entre les deux est comblé par un développeur qui prend une décision de design à 18 h, sans le contexte nécessaire pour bien la prendre.',
      },

      {
        kind: 'fact',
        title: 'Votre organigramme finit dans le produit',
        text: 'Melvin Conway a observé en 1968 que les systèmes finissent par refléter la structure de communication de l’organisation qui les a construits. Confiez le design et le développement à deux contrats séparés et vous obtiendrez une interface avec une couture au milieu — non parce que quelqu’un a été négligent, mais parce que les deux moitiés n’ont jamais eu de moyen simple de se parler.',
      },

      { kind: 'h2', text: 'Ce qui manque à toute maquette' },
      {
        kind: 'p',
        text: 'Voici les états que nous exigeons désormais avant de déclarer quoi que ce soit prêt. La plupart des désaccords entre designers et développeurs se ramènent en fait à l’un d’eux resté indéfini.',
      },
      {
        kind: 'list',
        items: [
          '**Vide.** Ce que voit un nouveau compte. Souvent l’écran le plus vu du produit et le moins travaillé.',
          '**Chargement.** Squelette, indicateur ou rien — décidé, pas laissé par défaut.',
          '**Erreur.** Par champ et par page, avec la phrase réellement écrite.',
          '**Trop.** Le nom le plus long, la description de 400 caractères, la liste de quarante éléments.',
          '**Trop peu.** Un élément. Zéro élément. Un nom de deux lettres.',
          '**Permissions.** Ce que voit l’utilisateur en lecture seule là où se trouvait le bouton.',
        ],
      },

      {
        kind: 'quote',
        text: 'Un design est terminé quand son état le plus laid a été dessiné, pas le plus beau.',
      },

      { kind: 'h2', text: 'Ce qui a remplacé la passation chez nous' },
      {
        kind: 'p',
        text: 'Une équipe, un dépôt, et un lien de préproduction dès la première semaine. Les designers relisent dans le navigateur plutôt que dans le fichier — parce que c’est là que la typographie s’affiche autrement, que l’ombre est plus lourde et que l’état survol existe.',
      },
      {
        kind: 'p',
        text: 'Nous avons aussi cessé de considérer le fichier de design comme la source de vérité. Dès qu’un composant est construit, c’est le composant construit qui fait foi, et le fichier le suit. Un fichier qui contredit la production n’est pas de la documentation, c’est de la désinformation.',
      },
      {
        kind: 'p',
        text: 'Si vous devez travailler avec deux prestataires, offrez-leur un point hebdomadaire commun et inscrivez la checklist des états ci-dessus dans le contrat. Cela coûte une heure par semaine et évite la dispute sur qui devait dessiner l’état vide.',
      },
    ],
  },
}
