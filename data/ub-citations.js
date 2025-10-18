// Urantia Book citation metadata
// Format: "Paper:Section.Paragraph" -> { paper, section }

export const ubCitations = {
  "29:4.13": {
    paper: "The Universe Power Directors",
    section: "The Master Physical Controllers"
  },
  "29:4.14": {
    paper: "The Universe Power Directors",
    section: "The Master Physical Controllers"
  },
  "29:4.19": {
    paper: "The Universe Power Directors",
    section: "The Master Physical Controllers"
  },
  "29:4.36": {
    paper: "The Universe Power Directors",
    section: "The Frandalanks"
  },
  "29:4.37": {
    paper: "The Universe Power Directors",
    section: "The Frandalanks"
  },
  "189:1.1": {
    paper: "The Resurrection",
    section: "The Morontia Transit"
  },
}

export function getCitationInfo(citation) {
  return ubCitations[citation] || null
}
