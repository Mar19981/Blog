interface NavigationLink {
    name: string,
    destination: string
}

interface Properties {
    isAdmin: boolean,
    isEditor: boolean,
    navigation?: Array<NavigationLink>
}

const userProperties: Record<string, Properties> = {
    "admin": {isAdmin: true, isEditor: false, navigation: [ 
        {name: "Moje konto", destination: "/my-profile"},
        {name: "Komentarze", destination: "/comments"}, 
        {name: "Newsy", destination: "/news"}, 
        {name: "Użytkownicy", destination: "/users"}
    ]},
    "editor": {isAdmin: false, isEditor: true, 
        navigation: [
            {name: "Moje konto", destination: "/my-profile"},
            {name: "Komentarze", destination: "users/:id/comments"},
            {name: "Newsy", destination: "users/:id/news"}
        ]},
    "standard": {isAdmin: false, isEditor: false, 
        navigation: [
            {name: "Moje konto",destination: "/my-profile"},
            {name: "Komentarze", destination: "users/:id/comments"}
        ]},
    }

export default userProperties;