import type { PostSlug, PostText } from './posts'

/** Немецкие тексты статей. Ключи покрывают весь PostSlug — иначе не соберётся. */
export const postsDe: Record<PostSlug, PostText> = {
  'landing-page-design-problem': {
    title: 'Ihre Landingpage hat kein Designproblem',
    categoryLabel: 'Conversion',
    excerpt:
      'Wir haben elf Seiten geprüft, die unter 1 % konvertierten. Zehn davon sahen gut aus. Das Problem war immer dasselbe — und nie die Hero-Section.',
    coverCaption: 'Elf Audits, ein wiederkehrendes Muster.',
    body: [
      {
        kind: 'p',
        text: 'Alle paar Wochen schickt uns jemand einen Link und denselben Satz: **„Die Seite sieht toll aus, aber niemand registriert sich."** Im letzten Quartal haben wir elf solcher Audits durchgeführt. Zwei der Seiten brauchten tatsächlich ein Redesign. Die anderen neun waren in Ordnung — saubere Typografie, ordentliche Hierarchie, schnell genug.',
      },
      {
        kind: 'p',
        text: 'Das Muster, das wir immer wieder fanden, hatte nichts damit zu tun, wie die Seite aussah.',
      },

      { kind: 'h2', text: 'Die Seite beantwortete die falsche Frage' },
      {
        kind: 'p',
        text: 'Fast jede schwache Seite, die wir öffneten, war gebaut, um **„Was ist dieses Produkt?"** zu beantworten. Der Besucher kam mit einer ganz anderen Frage: **„Ist das etwas für jemanden wie mich, und was passiert, wenn ich klicke?"**',
      },
      {
        kind: 'p',
        text: 'Das sind zwei verschiedene Seiten. Die erste erklärt Funktionen. Die zweite räumt Zweifel aus. Wenn Sie die erste schreiben und die Wirkung der zweiten erwarten, liegt die Conversion bei 1 % — und kein Verlauf der Welt repariert das.',
      },
      {
        kind: 'quote',
        text: 'Niemand springt ab, weil die Abstände nicht stimmten. Man springt ab, weil man nicht erkennen konnte, ob es für einen selbst gedacht war.',
      },

      {
        kind: 'fact',
        title: 'Das Aussehen wird in 50 Millisekunden beurteilt',
        text: 'Lindgaard und Kolleginnen zeigten Testpersonen Webseiten für nur 50 ms und ließen sie die optische Attraktivität bewerten. Die Bewertungen deckten sich eng mit jenen nach 500 ms — und blieben bei Wiederholung stabil. In 50 ms wird nichts gelesen und nichts verglichen: wahrgenommen werden Farbe, Dichte, Bildsprache und Schrift. Dieses Urteil fällt lange bevor Ihr Text überhaupt zum Zug kommt — genau deshalb muss der Text den Rest tragen.',
        source: {
          label: 'Lindgaard et al., Behaviour & Information Technology, 2006',
          url: 'https://www.tandfonline.com/doi/abs/10.1080/01449290500330448',
        },
      },

      { kind: 'h2', text: 'Drei Dinge, die wir zuerst geändert haben' },
      {
        kind: 'p',
        text: 'Bevor wir das Layout anfassten, haben wir auf jeder Seite dieselben drei Stellen neu geschrieben. Meistens bewegte allein das die Zahl genug, um das Audit zu rechtfertigen.',
      },

      { kind: 'h3', text: '1. Die Subheadline benennt den Leser' },
      {
        kind: 'p',
        text: 'Headlines bekommen die ganze Aufmerksamkeit und das meiste Budget. Die Zeile darunter leistet die eigentliche Arbeit: Sie sagt, für wen das ist und was sich dadurch ändert. Aus „Analytics für Teams" wird „Sehen Sie, welche Ihrer Anzeigen sich wirklich rechnen — ohne Datenanalyst."',
      },

      { kind: 'h3', text: '2. Der Button sagt, was als Nächstes passiert' },
      {
        kind: 'p',
        text: '„Loslegen" ist kein Versprechen, sondern ein Schulterzucken. „Kostenlos starten — ohne Karte" ist ein Versprechen. Menschen zögern vor Buttons weit länger, als Designer annehmen, und die Beschriftung ist in diesem Moment die einzige Information, die sie haben.',
      },

      { kind: 'h3', text: '3. Der erste Einwand steht über der Falz' },
      {
        kind: 'p',
        text: 'Jedes Produkt hat eine Frage, die Menschen sofort stoppt: Preis, Einrichtungsdauer, Vertragsbindung, Migration. Sie drei Abschnitte weiter unten zu vergraben, verzögert den Zweifel nicht — es schickt den Leser nur zur Konkurrenz, um dort die Antwort zu suchen.',
      },

      {
        kind: 'fact',
        title: 'Schön wirkt bedienbar — ob es das ist oder nicht',
        text: 'Kurosu und Kashimura testeten 26 Varianten einer Geldautomaten-Oberfläche mit 252 Teilnehmenden. Wie attraktiv ein Layout empfunden wurde, sagte die vermutete Bedienbarkeit weit besser voraus als die tatsächliche. Gutes Aussehen kauft Ihnen Geduld und Vertrauen. Es kauft Ihnen keine Entscheidung — die kommt weiterhin daher, was die Seite sagt.',
        source: {
          label: 'Kurosu & Kashimura, CHI ’95 — zusammengefasst von NN/g',
          url: 'https://www.nngroup.com/articles/aesthetic-usability-effect/',
        },
      },

      { kind: 'h2', text: 'Was wir nicht mehr empfehlen' },
      {
        kind: 'list',
        items: [
          '**Längere Seiten.** Abschnitte an eine Seite zu hängen, die niemand zu Ende liest, fühlt sich produktiv an — konvertiert aber nicht.',
          '**Social Proof ohne Konkretes.** „Von Tausenden geliebt" liest sich wie Dekoration. Ein Kundensatz mit einer Zahl liest sich wie ein Beleg.',
          '**Animation auf dem Hauptpfad.** Eine 400-ms-Einblendung zwischen Leser und Registrierungsbutton kostet mehr, als sie bringt.',
        ],
      },

      { kind: 'h2', text: 'Wann ist es denn wirklich Design?' },
      {
        kind: 'p',
        text: 'Zwei der elf Seiten mussten tatsächlich neu gebaut werden — beide waren Produkt-Dashboards, die sich als Marketing-Seiten ausgaben, mit einer Navigation, die niemand entziffern konnte. Das ist ein echtes Designproblem, und keine Textänderung rettet es.',
      },
      {
        kind: 'p',
        text: 'Aber wenn Ihre Seite lesbar ist, schnell lädt und trotzdem unter 1 % konvertiert: Fangen Sie bei den Worten an. Sie sind billiger zu ändern — und sie sagen Ihnen, was Sie neu gestalten müssen.',
      },
    ],
  },

  'design-system-nobody-maintains': {
    title: 'Das Design-System, das niemand pflegt',
    categoryLabel: 'Prozess',
    excerpt:
      'Drei Monate Komponentenarbeit, nach fünf Wochen aufgegeben. Was wir heute anders machen — und warum Dokumentation nie das Problem war.',
    coverCaption: 'Von innen sieht jedes aufgegebene System gleich aus.',
    body: [
      {
        kind: 'p',
        text: 'Wir haben inzwischen vier Design-Systeme sterben sehen. Andere Firmen, andere Werkzeuge, dieselbe Obduktion: eine schöne Bibliothek, eine Doku-Seite, die niemand öffnete, und ein Produktteam, das daneben still seine Einzelkomponenten baute.',
      },
      {
        kind: 'p',
        text: 'Die übliche Erklärung lautet **„Wir hatten keine Zeit mehr, es zu dokumentieren."** Das glauben wir nicht mehr. Jedes dieser Systeme hatte eine Dokumentation. Was fehlte, war ein Grund, es an einem schlechten Dienstag trotzdem zu benutzen.',
      },

      { kind: 'h2', text: 'Ein isoliert gebautes System ist ein Vorschlag, kein System' },
      {
        kind: 'p',
        text: 'Die gescheiterten entstanden alle gleich: Ein Designer verschwand für zwei, drei Monate und präsentierte dann eine fertige Bibliothek. Sie war vollständig, konsistent — und vollständig losgelöst von den Screens, die das Team in diesem Quartal tatsächlich auslieferte.',
      },
      {
        kind: 'p',
        text: 'Als ein echtes Feature zum ersten Mal etwas brauchte, das die Bibliothek nicht hatte, machte jemand eine Ausnahme. Die zweite Ausnahme war in zehn Minuten begründet. Bei der fünften war die Bibliothek ein Museum.',
      },
      {
        kind: 'quote',
        text: 'Eine Komponente, für die niemand kämpfen musste, ist eine Komponente, die niemand verteidigt.',
      },

      {
        kind: 'fact',
        title: 'Wir überschätzen, was wir selbst gebaut haben',
        text: 'Norton, Mochon und Ariely nannten es den IKEA-Effekt: Menschen messen Dingen, die sie selbst zusammengebaut haben, einen unverhältnismäßig hohen Wert bei — auch wenn das Ergebnis schlecht ist. Das erklärt beide Hälften des Problems. Der Autor des Systems versteht nicht, warum jemand davon abweichen sollte — und der Entwickler, der im letzten Sprint sein eigenes Dropdown gebaut hat, hängt ehrlich daran. Geteilte Verantwortung ist hier kein Nice-to-have. Sie ist der Mechanismus.',
      },

      { kind: 'h2', text: 'Was wir stattdessen tun' },
      {
        kind: 'list',
        items: [
          '**Aus echten Screens bauen.** Keine Komponente kommt in die Bibliothek, bevor sie an zwei verschiedenen Stellen im echten Produkt aufgetaucht ist. Das zweite Auftreten beweist, dass es ein Muster ist und kein Einzelfall.',
          '**Pro Bereich einen Verantwortlichen benennen.** Kein Gremium. Eine Person, die angeschrieben wird, wenn ein Button einen neuen Zustand braucht.',
          '**Die Pflege laut einplanen.** Wir kalkulieren Design-System-Arbeit als laufende Position, nicht als einmaliges Ergebnis. Ein System ohne Wartungsbudget hat ein festes Sterbedatum, und das sollten alle wissen.',
          '**Den Abkürzungsweg zum richtigen Weg machen.** Wenn der Griff zur Bibliothek langsamer ist als ein kopiertes div, verliert die Bibliothek. Jedes Mal.',
        ],
      },

      { kind: 'h2', text: 'Dokumentation sind die letzten 10 %' },
      {
        kind: 'p',
        text: 'Wir schreiben sie weiterhin. Aber erst, nachdem das System den Kontakt mit drei oder vier Features überlebt hat — und wir legen sie dorthin, wo Entwickler ohnehin leben: ins Repository, nicht auf eine separate Seite mit zweitem Login.',
      },
      {
        kind: 'p',
        text: 'Das eine der vier Systeme, das zwei Jahre später noch lebt, hat die schlechteste Dokumentation von allen. Es hat aber zwei benannte Verantwortliche, eine monatlich blockierte Stunde zum Aufräumen und die Regel, dass neue Komponenten zusammen mit dem Feature ankommen, das sie gebraucht hat. Das zählte am Ende mehr als jede Seite Richtlinien.',
      },
    ],
  },

  'stop-testing-onboarding-on-designers': {
    title: 'Testen Sie Onboarding nicht mit Designern',
    categoryLabel: 'UX',
    excerpt:
      'Ihr Team weiß, wo alles liegt. Genau deshalb sind es die schlechtesten Leute, um einen Erstkontakt zu validieren.',
    coverCaption: 'Der erste Durchlauf passiert pro Person genau einmal.',
    body: [
      {
        kind: 'p',
        text: 'Es gibt diese eine Art Meeting, in der ein Team durch das eigene Onboarding klickt, sich einig ist, dass alles klar ist, und es ausliefert. Zwei Wochen später hat sich die Aktivierung nicht bewegt, und niemand kann sagen, warum.',
      },
      {
        kind: 'p',
        text: 'Der Grund ist banal: **Man kann das eigene Produkt nicht wieder verlernen.** Wenn Sie einmal wissen, dass das Konto vor dem Workspace angelegt werden muss, wirkt jeder Screen, der das erklärt, überflüssig. Für neue Nutzer ist es das Einzige, was den Ablauf zusammenhält.',
      },

      { kind: 'h2', text: 'Der Fluch des Wissens, praktisch' },
      {
        kind: 'p',
        text: 'Designer und Entwickler wissen nicht nur mehr als neue Nutzer. Sie kennen eine andere Form des Produkts. Sie denken in Objekten — Workspace, Projekt, Mitglied. Neue Nutzer denken in Absichten: „Ich will sehen, ob das Ding X kann, bevor ich meinen Chef einlade."',
      },
      {
        kind: 'p',
        text: 'Wenn diese beiden Modelle sich widersprechen, gewinnt meist die Oberfläche den Streit — und der Nutzer geht.',
      },

      {
        kind: 'fact',
        title: 'Fünf Fremde schlagen fünf Kollegen',
        text: 'Nielsen und Landauer modellierten, wie Usability-Probleme mit jeder zusätzlichen Testperson auftauchen: Bei einer durchschnittlichen Fundrate von rund 31 % pro Person decken fünf Nutzer etwa 85 % der Probleme eines Entwurfs auf. Wichtig ist die Einschränkung: Über hundert Fünf-Personen-Tests hinweg lag die tatsächliche Spanne bei etwa 55 % bis 95 % — je nachdem, wen man rekrutiert hat. Fünf reichen für den Anfang. Fünf falsche Personen sind trotzdem null.',
        source: {
          label: 'Nielsen & Landauer, 1993 — erklärt von NN/g',
          url: 'https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/',
        },
      },

      { kind: 'h2', text: 'Wie ein nützlicher Erstkontakt-Test aussieht' },
      {
        kind: 'list',
        items: [
          '**Rekrutieren Sie nach Käuferprofil, nicht nach Budget.** Ein Bekannter aus einer anderen Abteilung ist bequem und wertlos. Er vertraut Ihnen bereits.',
          '**Geben Sie ein Ziel, kein Skript.** „Kommen Sie an den Punkt, an dem Sie wüssten, ob sich das Bezahlen lohnt." Und dann schweigen Sie.',
          '**Achten Sie darauf, wo sie verstummen.** Stille und erneutes Lesen sind das Signal. Menschen kündigen Verwirrung selten an; sie werden einfach langsamer.',
          '**Testen Sie den leeren Zustand.** Die meisten Onboarding-Demos laufen mit Beispieldaten. Echte Konten öffnen sich mit nichts darin — und dieser Screen überzeugt mehr als jede Tour.',
        ],
      },

      {
        kind: 'quote',
        text: 'Wenn Sie den Ablauf vor Testbeginn erklären müssen, haben Sie das Problem bereits gefunden.',
      },

      { kind: 'h2', text: 'Eine Gewohnheit, die sich zu klauen lohnt' },
      {
        kind: 'p',
        text: 'Wir bitten jeden neuen Mitarbeitenden, sich am ersten Tag allein beim Kundenprodukt zu registrieren und dabei den Bildschirm aufzuzeichnen. So ahnungslos werden sie nie wieder sein — und diese Ahnungslosigkeit ist für etwa vierzig Minuten das Wertvollste, was sie besitzen.',
      },
      {
        kind: 'p',
        text: 'Diese Aufnahmen haben mehr Onboarding-Probleme gefunden als jeder Workshop, den wir je durchgeführt haben.',
      },
    ],
  },

  'six-weeks-or-it-never-ships': {
    title: 'Sechs Wochen — oder es geht nie live',
    categoryLabel: 'Prozess',
    excerpt:
      'Jedes Projekt, das wir länger als sechs Wochen führten, verlor irgendwo in der Mitte den Schwung. Also haben wir aufgehört, längere zu verkaufen.',
    coverCaption: 'Die Mitte eines langen Projekts ist der Ort, an dem Projekte sterben.',
    body: [
      {
        kind: 'p',
        text: 'Früher haben wir Dreimonats-Mandate verkauft. Auf dem Papier waren sie profitabler und leichter zu besetzen. Sie brachten uns auch unsere einzigen beiden wirklich unzufriedenen Kunden — und beide Male begann der Ärger an genau derselben Stelle: in Woche sechs.',
      },
      {
        kind: 'p',
        text: 'Nicht weil etwas kaputtging. Sondern weil nichts passierte. Woche sechs ist der Punkt, an dem ein langes Projekt für alle Beteiligten aufhört, dringend zu wirken.',
      },

      {
        kind: 'fact',
        title: 'Arbeit dehnt sich auf die verfügbare Zeit aus',
        text: 'Cyril Northcote Parkinson schrieb es 1955 als Scherz im Economist, und es hat die meiste ernsthafte Managementtheorie überlebt. Die praktische Fassung für Designarbeit: Eine Entscheidung, die diesen Donnerstag fallen muss, braucht einen Nachmittag. Dieselbe Entscheidung mit einem Monat Vorlauf braucht einen Monat — und fällt etwas schlechter aus, weil sie die ganze Zeit über Meinungen einsammelt.',
      },

      { kind: 'h2', text: 'Was tatsächlich schiefgeht' },
      {
        kind: 'p',
        text: 'Lange Projekte scheitern in Zeitlupe, und immer durch dieselben drei Türen.',
      },
      {
        kind: 'list',
        items: [
          '**Der Umfang wird höflich erweitert.** Niemand verlangt ein Redesign. Man bittet elfmal um „nur noch einen Zustand".',
          '**Der Entscheider driftet ab.** Der Gründer, der in Woche eins in jedem Call saß, leitet jetzt Screenshots an jemanden weiter, der nie dabei war.',
          '**Das Team spürt die Deadline nicht mehr.** Ein Termin in zwölf Wochen ist keine Deadline, sondern eine Wettervorhersage.',
        ],
      },

      { kind: 'h2', text: 'Sechs Wochen, und der Umfang gibt nach' },
      {
        kind: 'p',
        text: 'Die Lösung war nicht, schneller zu arbeiten. Sie war, das Datum festzuschreiben und stattdessen den Umfang beweglich zu machen. Wir verkaufen heute Sechs-Wochen-Blöcke mit hartem Ende und einer priorisierten Liste dessen, was hineingehört. Kommt unterwegs etwas Neues dazu, verschiebt es nicht das Datum — es drängt den am niedrigsten priorisierten Punkt hinaus.',
      },
      {
        kind: 'quote',
        text: 'Ein festes Datum mit flexiblem Umfang liefert. Ein fester Umfang mit flexiblem Datum verhandelt.',
      },
      {
        kind: 'p',
        text: 'Kunden widersprechen dem genau einmal, meist in der ersten Woche. Dann fällt etwas weg, die Seite geht am versprochenen Tag live, und der gestrichene Punkt erweist sich als von Anfang an optional. Dieses Gespräch hatten wir oft genug, um es heute gleich vorab zu führen.',
      },

      { kind: 'h2', text: 'Was sechs Wochen Ihnen bringen' },
      {
        kind: 'p',
        text: 'Discovery in Woche eins. Design über die Wochen zwei bis vier, mit einem Live-Link ab dem ersten Freitag. Umsetzung und Härtung in fünf und sechs. Alles, was der Kunde sieht, ist ab der zweiten Woche echt und klickbar — was bedeutet, dass die Diskussionen stattfinden, solange sie noch billig sind.',
      },
      {
        kind: 'p',
        text: 'Größere Produkte brauchen selbstverständlich länger als sechs Wochen. Sie brauchen nur keinen einzelnen Sechs-Wochen-Block — sie brauchen drei davon, jeder mit eigenem Enddatum und eigenem lieferbarem Ergebnis. Der Rhythmus ist der Punkt, nicht die Gesamtdauer.',
      },
    ],
  },

  'pricing-pages-are-product-design': {
    title: 'Preisseiten sind Produktdesign, kein Marketing',
    categoryLabel: 'Business',
    excerpt:
      'Die Seite, auf der Menschen entscheiden, Sie zu bezahlen, wird wie eine Broschüre behandelt. Wir haben eine als Produktoberfläche neu gebaut — die Testphasen stiegen um 27 %.',
    coverCaption: 'Der Screen mit der höchsten Kaufabsicht auf den meisten Seiten.',
    body: [
      {
        kind: 'p',
        text: 'Auf den meisten Websites hat die Preisseite die höchste Kaufabsicht und die geringste gestalterische Aufmerksamkeit. Sie wird vom Marketing geschrieben, von der Finanzabteilung geprüft und zuletzt gebaut. Dabei ist sie die einzige Seite, auf der Besucher bereits entschieden haben, dass sie das Produkt wollen — und nun entscheiden, ob sie der Zahl trauen.',
      },
      { kind: 'p', text: 'Das ist keine Broschüre. Das ist eine Entscheidungsoberfläche.' },

      { kind: 'h2', text: 'Zu viele Tarife sind keine Großzügigkeit' },
      {
        kind: 'p',
        text: 'Das Häufigste, was wir entfernen, ist ein Tarif. Teams fügen Stufen hinzu, um jedes Segment abzudecken — und jede einzelne erzeugt einen Vergleich, den der Besucher nun anstellen muss.',
      },

      {
        kind: 'fact',
        title: 'Mehr Optionen, langsamere Entscheidungen',
        text: 'Das Hicksche Gesetz — aus Hicks Arbeit von 1952 und Hymans von 1953 — besagt, dass die Entscheidungszeit mit Anzahl und Komplexität der Optionen wächst, ungefähr logarithmisch. Das ist kein Freibrief, alles auf einen einzigen Button einzudampfen. Es ist die Erinnerung daran, dass jede zusätzliche Spalte ein Preis ist, den jeder Besucher zahlt — ob diese Spalte für ihn gedacht war oder nicht.',
        source: { label: 'Hicksches Gesetz — Laws of UX', url: 'https://lawsofux.com/hicks-law/' },
      },

      { kind: 'h2', text: 'Was wir zuerst ändern' },
      {
        kind: 'list',
        items: [
          '**Ein empfohlener Tarif, sichtbar empfohlen.** Nicht als Trick, sondern weil ein ungeführter Vergleich Arbeit ist, für die sich der Besucher nicht gemeldet hat.',
          '**Funktionsnamen in den Worten des Käufers.** „Unbegrenzte Plätze" ist ein Feature. „Ihr ganzes Team, ohne Pro-Kopf-Rechnerei" ist eine Antwort auf das, was ihn wirklich beschäftigt hat.',
          '**Der Einwand direkt neben dem Preis.** Vertragslaufzeit, was nach der Testphase passiert, ob eine Karte nötig ist. Jede unbeantwortete dieser Fragen schickt Menschen zur Konkurrenz, um sie zu klären.',
          '**Ein sichtbarer Ausgang.** Klar benannte Kündigungs- und Downgrade-Bedingungen erhöhen die Anmeldungen. Umkehrbarkeit ist es, was eine Entscheidung billig macht.',
        ],
      },

      {
        kind: 'quote',
        text: 'Menschen verlassen Preisseiten nicht, weil es zu teuer ist. Sie verlassen sie, weil sie nicht erkennen können, was als Nächstes passiert.',
      },

      {
        kind: 'fact',
        title: 'Der Tarif, den niemand kauft, arbeitet trotzdem',
        text: 'Dan Ariely machte einen Fall aus dem Economist bekannt: ein Abo-Angebot, bei dem eine reine Print-Option, die niemand wählte, das Print-plus-Web-Paket offensichtlich richtig aussehen ließ. Entfernt man die ungewollte Option, verschieben sich die Präferenzen. Anker und Lockvogel-Optionen sind real und wirken auf Ihrer Seite bereits — die einzige Frage ist, ob Sie sie bewusst oder zufällig angeordnet haben.',
      },

      { kind: 'h2', text: 'Die 27 %' },
      {
        kind: 'p',
        text: 'Bei dem Umbau, den wir immer wieder zitieren, stiegen die Testphasen um 27 %, und der Preis änderte sich nicht. Wir entfernten einen vierten Tarif, verschoben den Jahres-/Monats-Umschalter über die Karten statt darunter, formulierten neun Feature-Bezeichnungen neu und setzten die Zeile „keine Karte erforderlich" in den Button-Bereich statt in die Fußnote.',
      },
      {
        kind: 'p',
        text: 'Nichts davon ist Werbetext. Alles davon ist Interface-Design, angewendet auf den Moment, in dem jemand entscheidet, Sie zu bezahlen.',
      },
    ],
  },

  'what-we-ask-before-we-quote': {
    title: 'Was wir fragen, bevor wir ein Angebot machen',
    categoryLabel: 'Business',
    excerpt:
      'Neun Fragen. Kann ein Kunde vier davon nicht beantworten, wird die Schätzung falsch — und beide Seiten sind in Woche drei unglücklich.',
    coverCaption: 'Die Schätzung ist nur so gut wie die Fragen dahinter.',
    body: [
      {
        kind: 'p',
        text: 'Ein Studio, das schnell Angebote macht, wirkt reaktionsschnell. Es ist auch der Weg, dieselbe Seite dreimal kostenlos neu zu bauen. Wir nennen heute keine Zahl, bevor wir Antworten auf neun Fragen haben — und sagen das schon im ersten Gespräch.',
      },

      {
        kind: 'fact',
        title: 'Alle unterschätzen, wir eingeschlossen',
        text: 'Kahneman und Tversky benannten 1979 den Planungsfehlschluss: Menschen schätzen die Dauer der eigenen Arbeit danach, wie sie laufen sollte, und blenden aus, wie vergleichbare Arbeit tatsächlich gelaufen ist. Die Lösung ist kein Optimismus-Management. Sie besteht darin, Fragen zu stellen, deren Antworten Tatsachen über die Vergangenheit sind statt Hoffnungen über die Zukunft.',
      },

      { kind: 'h2', text: 'Die neun' },
      {
        kind: 'list',
        items: [
          '**Wer gibt frei?** Ein Name. Ist die Antwort eine Liste, hat der Zeitplan ein Problem, bevor er beginnt.',
          '**Was muss am Launch-Tag wahr sein, damit es sich gelohnt hat?** Die Antwort ist das eigentliche Briefing.',
          '**Was messen Sie heute?** Wenn nichts, ist das erste Ergebnis Analytics, nicht Design.',
          '**Woher kommen die Inhalte?** Verspätete Texte sind die mit Abstand häufigste Ursache für einen gerissenen Termin.',
          '**Was existiert bereits?** Marke, Design-System, Komponentenbibliothek, CMS. Die halbe Schätzung besteht darin, herauszufinden, was Sie nicht bauen müssen.',
          '**Wer baut danach weiter?** Ein Team, das den Code erbt, braucht eine andere Übergabe als eines, das ihn nie anfasst.',
          '**Was haben Sie vorher versucht?** Der gescheiterte Versuch ist meist aufschlussreicher als das Briefing.',
          '**Was ist wirklich fix?** Termin, Budget oder Umfang — eines von dreien. Nicht alle drei.',
          '**Was passiert, wenn wir nichts tun?** Lautet die ehrliche Antwort „nicht viel", verliert das Projekt bis Woche drei gegen etwas Dringendes.',
        ],
      },

      {
        kind: 'quote',
        text: 'Wenn vier davon unbeantwortbar sind, kalkulieren wir kein Projekt. Wir kalkulieren eine Vermutung.',
      },

      { kind: 'h2', text: 'Was wir tun, wenn die Antworten fehlen' },
      {
        kind: 'p',
        text: 'Dann verkaufen wir stattdessen eine bezahlte Discovery-Woche. Sie ist klein, festpreisig und erzeugt einen Umfang, den beide Seiten bepreisen können. Kunden, die bei einer Discovery-Woche zögern, wären mit einem Festpreis auf Annahmen nie glücklich geworden — und das für die Kosten einer Woche herauszufinden, ist für alle billig.',
      },
      {
        kind: 'p',
        text: 'Jedes Projekt, das bei uns schlecht lief, lässt sich auf eine Frage dieser Liste zurückführen, die wir haben durchgehen lassen, weil der Kunde begeistert wirkte und wir den Auftrag wollten.',
      },
    ],
  },

  'animations-costing-conversions': {
    title: 'Ihre Animationen kosten Sie Conversions',
    categoryLabel: 'Entwicklung',
    excerpt:
      'Wir lieben Bewegung. Wir haben auch gemessen, was passiert, wenn ein 400-ms-Übergang zwischen Nutzer und Absenden-Button liegt.',
    coverCaption: 'Bewegung auf dem Hauptpfad ist eine Steuer auf jeden Besuch.',
    body: [
      {
        kind: 'p',
        text: 'Dieses Studio mag Bewegung. Auf unserer eigenen Startseite läuft eine Canvas-Animation. Nehmen Sie das also als Geständnis, nicht als Belehrung: Der Großteil der Animation, die wir in unseren ersten Jahren ausgeliefert haben, hat unsere Kunden Geld gekostet.',
      },
      {
        kind: 'p',
        text: 'Nicht die dekorative Art. Die Art, die **auf dem Weg** liegt — eine Einblendung, bevor das Formular erscheint, ein 400-ms-Modal, ein scroll-getriggertes Fade zwischen dem Leser und dem Button, für den er gekommen ist.',
      },

      {
        kind: 'fact',
        title: 'Die 400-ms-Grenze',
        text: 'Walter Doherty und Arvind Thadani veröffentlichten 1982 bei IBM eine Arbeit, die argumentierte, dass Antwortzeiten von Computern unter 400 ms liegen sollten statt bei den damals akzeptierten zwei Sekunden. Unterhalb dieser Schwelle stiegen Produktivität und Zufriedenheit deutlich — die Maschine unterbrach den Gedankengang nicht mehr. Vier Jahrzehnte später ist das noch immer eine brauchbare Obergrenze: Jenseits von rund 400 ms ist Ihr Übergang kein Feinschliff mehr, sondern Latenz.',
        source: {
          label: 'Doherty-Schwelle — Laws of UX',
          url: 'https://lawsofux.com/doherty-threshold/',
        },
      },

      { kind: 'h2', text: 'Was wir heute messen' },
      {
        kind: 'p',
        text: 'Vor und nach jeder Arbeit an Bewegung protokollieren wir die Zeit bis zur ersten Interaktion mit dem primären CTA — nicht die Ladezeit, sondern wie lange es vom Eintreffen dauert, bis Besucher tatsächlich handeln können. Daraus sind zwei Regeln entstanden, die wir seither nicht gebrochen haben.',
      },
      {
        kind: 'list',
        items: [
          '**Zwischen Nutzer und Hauptaktion wird nichts animiert.** Formulare, Buttons und Preise sind da. Sie treffen nicht ein.',
          '**Feedback-Animation bleibt unter 200 ms, Übergänge unter 300 ms.** Alles Langsamere bekommt eine schriftliche Begründung daneben.',
        ],
      },

      {
        kind: 'quote',
        text: 'Animation ist gratis, solange sie neben dem Nutzer läuft — und teuer in dem Moment, in dem sie vor ihm läuft.',
      },

      { kind: 'h2', text: 'Scroll-Einblendungen verdienen einen eigenen Absatz' },
      {
        kind: 'p',
        text: 'Fade-in beim Scrollen ist der meistkopierte Effekt im Web und der am leichtesten falsch gemachte. Zwei Fehlermuster sehen wir ständig: Inhalte, die nie erscheinen, weil der Observer bei schnellem Scrollen nicht auslöst — und Einblendungen auf Text, den ein Besucher gerade aktiv zu lesen versucht.',
      },
      {
        kind: 'p',
        text: 'Unsere Regel: Eine Einblendung darf einmal laufen, muss unter 800 ms abgeschlossen sein und darf niemals etwas verzögern, wofür der Besucher genau dorthin gescrollt ist.',
      },

      { kind: 'h2', text: 'Der Teil zur Barrierefreiheit ist nicht optional' },
      {
        kind: 'p',
        text: 'Bewegung ist nicht für alle bloß eine ästhetische Vorliebe. Parallaxe und großflächige Bewegung können bei Menschen mit vestibulären Störungen Übelkeit und Schwindel auslösen. Jedes Betriebssystem bietet heute eine Einstellung „Bewegung reduzieren", und sie zu respektieren kostet eine Media Query.',
      },
      {
        kind: 'p',
        text: 'Ignoriert Ihre Seite `prefers-reduced-motion`, schließt ein Teil der Besucher den Tab aus Gründen, die Ihre Analytics nie erklären werden.',
      },
    ],
  },

  'dark-mode-is-not-a-feature': {
    title: 'Dark Mode ist kein Feature',
    categoryLabel: 'UX',
    excerpt:
      'Es ist ein zweites Design-System mit eigenen Kontrastregeln, eigenen Bugs und eigenen Wartungskosten. Entscheiden Sie das bewusst.',
    coverCaption: 'Zwei Themes bedeuten zwei von allem.',
    body: [
      {
        kind: 'p',
        text: 'Dark Mode landet als Häkchen im Backlog. Er verhält sich wie ein Fork. Ab dem Moment, in dem Sie ihn ausliefern, haben Sie zwei Farbsysteme, zwei Sätze von Kontrastentscheidungen, zwei Screenshot-Sätze im Marketing — und jede künftige Komponente muss zweimal geboren werden.',
      },
      {
        kind: 'p',
        text: 'Wir sind nicht dagegen. Diese Seite ist dunkel. Wir sind dagegen, ihn als Schalter zu behandeln, den jemand in einem Sprint nachrüstet.',
      },

      { kind: 'h2', text: 'Umkehren ist kein Gestalten' },
      {
        kind: 'p',
        text: 'Die naive Variante dreht die Palette um und erklärt es für erledigt. Dann tauchen die Probleme auf: reinweißer Text auf reinem Schwarz flimmert, Schatten transportieren keine Tiefe mehr, weil nichts mehr da ist, was man abdunkeln könnte, Markenfarben, die auf Weiß strahlten, wirken schlammig, und jede Illustration mit transparentem Hintergrund verschwindet.',
      },
      {
        kind: 'list',
        items: [
          '**Tiefe muss neu gebaut werden.** Helle Themes heben Flächen mit Schatten an. Dunkle heben sie mit Helligkeit an — je höher die Fläche, desto heller wird sie.',
          '**Markenfarben brauchen meist einen zweiten Ton.** Der Akzent, der auf Weiß den Kontrast besteht, besteht ihn auf Fast-Schwarz selten.',
          '**Reines Schwarz und reines Weiß sind beides Fallen.** Maximaler Kontrast erzeugt Halation, bei der heller Text in den dunklen Hintergrund ausblutet. Bei Menschen mit Astigmatismus ist das stärker ausgeprägt.',
          '**Bilder brauchen einen Plan.** Transparente PNGs, Screenshots und Logos setzen alle irgendwo eine Hintergrundfarbe voraus.',
        ],
      },

      {
        kind: 'fact',
        title: 'Die Kontrastuntergrenze ist eine Zahl, keine Meinung',
        text: 'Die WCAG setzt 4,5:1 für normalen Text und 3:1 für großen Text — und das gilt für beide Themes unabhängig voneinander. Eine Palette, die im hellen Modus besteht, sagt nichts über den dunklen aus. Das ist auch das, was wir in nachträglich ergänzten Dark Themes am häufigsten scheitern sehen: sekundärer und deaktivierter Text, bei dem Designer zu einem Grau greifen, das auf Weiß gut aussah.',
      },

      { kind: 'h2', text: 'Der ehrliche Preis' },
      {
        kind: 'p',
        text: 'Grob ein Drittel mehr Designzeit bei jeder neuen Komponente und eine dauerhafte zweite Spalte in jedem visuellen QA-Durchgang. Das ist der echte Preis, und er lohnt sich, wenn Ihr Produkt nachts, in langen Sitzungen oder von Entwicklern genutzt wird — Zielgruppen, die ernsthaft danach fragen werden.',
      },
      {
        kind: 'quote',
        text: 'Liefern Sie lieber ein Theme aus, über das Sie nachgedacht haben, als zwei, die Sie umgedreht haben.',
      },
      {
        kind: 'p',
        text: 'Wenn Sie sich doch dafür entscheiden, bauen Sie es ab Tag eins auf semantischen Tokens auf — `surface`, `text-primary`, `border-subtle` — und niemals auf rohen Hex-Werten in Komponenten. Tokens nachträglich in eine Codebasis mit fest verdrahteten Farben einzuziehen, ist weit aufwendiger als das Theme selbst.',
      },
    ],
  },

  'handoff-is-a-process': {
    title: 'Übergabe ist ein Prozess, kein Figma-Link',
    categoryLabel: 'Entwicklung',
    excerpt:
      'Die Umsetzung passt nie zum Mockup, wenn Design und Entwicklung getrennte Verträge sind. Hier ist die Checkliste, die wir stattdessen nutzen.',
    coverCaption: 'Die Lücke zwischen der Datei und der Umsetzung.',
    body: [
      {
        kind: 'p',
        text: 'Das Wort „Handoff" beschreibt das Problem treffend. Etwas ist fertig und wird dann geworfen. Was auf der anderen Seite landet, ist ein Standbild eines Systems, das in Zuständen funktionieren muss, die das Bild nie gezeigt hat.',
      },
      {
        kind: 'p',
        text: 'Mockups sind per Definition vollständig. Produkte sind es nicht. Jede Lücke dazwischen füllt ein Entwickler, der um 18 Uhr eine Designentscheidung trifft, ohne den Kontext, sie gut zu treffen.',
      },

      {
        kind: 'fact',
        title: 'Ihr Organigramm wird mit ausgeliefert',
        text: 'Melvin Conway beobachtete 1968, dass Systeme am Ende die Kommunikationsstruktur der Organisation abbilden, die sie gebaut hat. Beauftragen Sie Design und Entwicklung als zwei getrennte Verträge, bekommen Sie eine Oberfläche mit einer Naht in der Mitte — nicht weil jemand schlampig war, sondern weil die beiden Hälften nie einen billigen Weg hatten, miteinander zu reden.',
      },

      { kind: 'h2', text: 'Was in jedem Mockup fehlt' },
      {
        kind: 'p',
        text: 'Das sind die Zustände, die wir heute verlangen, bevor etwas als fertig gilt. Die meisten Streitigkeiten zwischen Designern und Entwicklern sind in Wahrheit einer dieser undefinierten Zustände.',
      },
      {
        kind: 'list',
        items: [
          '**Leer.** Was ein neues Konto sieht. Meist der meistbesuchte Screen im Produkt und der am wenigsten gestaltete.',
          '**Ladend.** Skeleton, Spinner oder nichts — entschieden, nicht per Default.',
          '**Fehler.** Pro Feld und pro Seite, mit ausformuliertem Satz.',
          '**Zu viel.** Der längste Name, die 400-Zeichen-Beschreibung, die Liste mit vierzig Einträgen.',
          '**Zu wenig.** Ein Eintrag. Null Einträge. Ein Name mit zwei Buchstaben.',
          '**Berechtigungen.** Was der Nutzer mit Leserechten dort sieht, wo vorher der Button war.',
        ],
      },

      {
        kind: 'quote',
        text: 'Ein Entwurf ist fertig, wenn sein hässlichster Zustand gezeichnet ist — nicht sein schönster.',
      },

      { kind: 'h2', text: 'Was die Übergabe bei uns ersetzt hat' },
      {
        kind: 'p',
        text: 'Ein Team, ein Repository und ab der ersten Woche ein Live-Staging-Link. Designer prüfen im Browser statt in der Datei — denn im Browser rendert die Schrift anders, ist der Schatten schwerer und existiert der Hover-Zustand.',
      },
      {
        kind: 'p',
        text: 'Wir haben außerdem aufgehört, die Designdatei als Quelle der Wahrheit zu behandeln. Sobald eine Komponente gebaut ist, ist die gebaute maßgeblich und die Datei folgt ihr. Eine Datei, die der Produktion widerspricht, ist keine Dokumentation, sondern Fehlinformation.',
      },
      {
        kind: 'p',
        text: 'Wenn Sie mit zwei Dienstleistern arbeiten müssen, spendieren Sie ihnen einen gemeinsamen wöchentlichen Call und schreiben Sie die Zustands-Checkliste oben in den Vertrag. Das kostet eine Stunde pro Woche und erspart den Streit darüber, wer den leeren Zustand hätte gestalten sollen.',
      },
    ],
  },
}
