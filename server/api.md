## Authorization

function: registration
type: post
link: /auth/registration
params: email, password

function: login
type: post
link: /auth/login
params: email, password

function: islogin
type: get
link: /auth/islogin

## Collection 

function: create collection
type: post
link: /api/create-collection
params: name

function: get collections
type: get
link: /api/get-collections

## Cards 

function: create card
type: post
link: /api/create-card
params: collectionID, frontSide, backSide

function: get card
type: get
link: /api/get-cards/:collectionID'

function: get all cards
type: get
link: /api/get-all-cards

function: get card
type: get
link: /api/get-card/:cardID
