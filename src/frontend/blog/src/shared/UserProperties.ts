import UserType from "./UserType";

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
    "admin": {isAdmin: true, isEditor: true, navigation: [ {name: "Moje konto", destination: "/my-account"},
        {name: "Komentarze", destination: "/comments"}, {name: "Newsy", destination: "/:id/news"}, {name: "Użytkownicy", destination: "/users"},
    {name:"Wyloguj się", destination: "/logout"}]},
    "editor": {isAdmin: true, isEditor: true, 
        navigation: [{name: "Moje konto", destination: "/my-account"},{name: "Komentarze", destination: "/:id/comments"}, {name: "Newsy", destination: "/:id/news"},
    {name:"Wyloguj się", destination: "/logout"}]},
    "standard": {isAdmin: true, isEditor: true, 
        navigation: [{name: "Moje konto", destination: "/my-account"},
    {name: "Komentarze", destination: "/:id/comments"},
{name:"Wyloguj się", destination: "/logout"}]},
    }

export default userProperties;