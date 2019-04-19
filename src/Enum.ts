export enum Commands {
    resetColors = 'peacock.resetColors',
    saveColorToFavorites = 'peacock.saveColorToFavorites',
    enterColor = 'peacock.enterColor',
    changeColorToRandom = 'peacock.changeColorToRandom',
    changeColorToVueGreen = 'peacock.changeColorToVueGreen',
    changeColorToAngularRed = 'peacock.changeColorToAngularRed',
    changeColorToReactBlue = 'peacock.changeColorToReactBlue',
    changeColorToFavorite = 'peacock.changeColorToFavorite',

    twitchSignIn = 'peacockTwitch.signIn',
    twitchSignOut = 'peacockTwitch.signOut',
    chatConnect = 'peacockTwitch.chatConnect',
    chatDisconnect = 'peacockTwitch.chatDisconnect'
}

export enum BuiltInColors {
    Vue = '#42b883',
    Angular = '#b52e31',
    React = '#00b3e6'
}

export enum TwitchClientStatus {
    loggingIn,
    loggedIn,
    chatConnected,
    chatDisconnected,
    loggedOut
}