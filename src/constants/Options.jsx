export const SelectTravelsList = [
    {
        id: 1,
        title: "Just Me",
        desc: "A sole traveller in exploration",
        icon: "👨/👩",
        people: "1 Person"
    },
    {
        id: 2,
        title: "A Couple",
        desc: "Two travellers in tandem",
        icon: "💑",
        people: "2 People"
    },
    {
        id: 3,
        title: "Family",
        desc: "A group of fun loving adv",
        icon: "👨‍👩‍👦",
        people: "3 to 5 People"
    },
    {
        id: 4,
        title: "Friends",
        desc: "A bunch of thrill-seekers",
        icon: "⛵",
        people: "5 to 10 People"
    }
]


export const SelectBudgetOptions = [
    {
        id: 1, 
        title: "Cheap",
        desc: "Stay conscious of costs",
        icon: "💵"
    },
    {
        id: 2, 
        title: "Moderate",
        desc: "Keep cost on the average side",
        icon: "💰"
    },
    {
        id: 3, 
        title: "Luxury",
        desc: "Don't worry about cost",
        icon: "💸"
    }
]


export const AI_PROMPT= `
Generate Travel Plan for Location: {location},
for {totalDays} days,
for {Traveler},
with a {budget} budget.

Give me:
- Hotel options list
- Daily itinerary

IMPORTANT:
Return ONLY valid JSON.
Do NOT add any introduction, explanation, notes, warnings, or text before or after the JSON.
Do NOT use markdown code blocks.
Do NOT wrap the JSON in \`\`\`json.
The response must start with { and end with }.

JSON format:
{
  "travelPlan": {
    "location": "",
    "duration": "",
    "budget": "",
    "hotels": [],
    "itinerary": []
  }
}
`