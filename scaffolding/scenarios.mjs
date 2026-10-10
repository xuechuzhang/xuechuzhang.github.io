/** Fictional, authored examples. They are not participant conversations or validated stimuli. */
export const SCENARIOS = Object.freeze([
  Object.freeze({
    id: 'team',
    title: 'A short reply from a teammate',
    context: 'You sent Sam a plan for a group presentation. Sam replied: “Do whatever you think is best.” Earlier, Sam had suggested discussing the plan together. The deadline is tomorrow.',
    interpretation: 'Sam may want more input into the decision. The short reply could also reflect limited time; the message alone does not settle what Sam means.',
    recommendation: 'Ask for clarification and leave room to revise the plan together.',
    draft: 'I may be reading too much into a short message, but I want to make sure your ideas are included. Is there anything you would change in the plan? We can talk briefly before the deadline.',
    transfer: Object.freeze({title: 'A new situation: a friend cancels', context: 'Alex cancels dinner with “I cannot make it tonight.” You have not seen each other for several weeks. Alex has been busy recently, and you had been looking forward to meeting.'})
  }),
  Object.freeze({
    id: 'plans',
    title: 'An uncertain answer about plans',
    context: 'You invite Jordan to an event. Jordan replies: “Maybe, I will see.” You have been organizing the plan and need to book places soon. Jordan has not said whether the timing or the activity is the problem.',
    interpretation: 'Jordan may be unsure about availability or about the event. There is not enough information to infer a single intention.',
    recommendation: 'Explain your booking constraint and ask a specific, open question.',
    draft: 'I need to book the places tomorrow. Is the timing difficult, or are you still deciding about the event? Either is fine; it would help to know what works for you.',
    transfer: Object.freeze({title: 'A new situation: feedback from a colleague', context: 'Taylor comments “Interesting choice” on a draft you shared. You had tried a new approach. Taylor has not explained the comment, and you will discuss the draft tomorrow.'})
  })
]);
