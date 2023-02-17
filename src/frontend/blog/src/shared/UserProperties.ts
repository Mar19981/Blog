interface NavigationLink {
    name: string,
    destination: string
}

interface Properties {
    isAdmin: boolean,
    isEditor: boolean,
    navigation?: Array<NavigationLink>
}

const userProperties: Record<number, Properties> = {
    1: {isAdmin: true, isEditor: false, navigation: [ 
        {name: "Moje konto", destination: "/my-account"},
        {name: "Komentarze", destination: "/comments"}, 
        {name: "Newsy", destination: "/news"}, 
        {name: "Użytkownicy", destination: "/users"}
    ]},
    2: {isAdmin: false, isEditor: true, 
        navigation: [
            {name: "Moje konto", destination: "/my-account"},
            {name: "Dodaj artykuł", destination: "/news/add"},
            {name: "Moje komentarze", destination: "/my-comments"},
            {name: "Moje artykuły", destination: "/my-news"}
        ]},
    3: {isAdmin: false, isEditor: false, 
        navigation: [
            {name: "Moje konto",destination: "/my-account"},
            {name: "Moje komentarze", destination: "/my-comments"}
        ]},
    }

export default userProperties;