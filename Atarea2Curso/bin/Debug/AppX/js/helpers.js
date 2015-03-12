(function () {
    $ = function(val) {
        return document.querySelector(val);
    };

    function getMousePosition(e) {
        var rect = {
            x: e.clientX,
            y: e.clientY - 40,
            width: 100,
            height: 100,
        };

        return rect;
    }

    function generateKey() {
        /// <signature helpKeyword="helpers.generateKey">
        /// <summary locid="helpers.generateKey">
        /// Create random string for unique item identification - Exmaple: 1342682373633112
        /// </summary>
        /// <returns>random string</returns>
        /// </signature>
        return new Date().getTime() + Math.floor((Math.random() * 999)).toString();
    }

    function toDateOnly(dateTime) {
        /// <signature helpKeyword="helpers.toDateOnly">
        /// <summary locid="helpers.toDateOnly">
        /// Converts DateTime to date format - dd/mm/yyyy
        /// </summary>
        /// <param name="note">date time object</param>
        /// <returns>date string</returns>
        /// </signature>
        if (dateTime.getDate())
            return dateTime.getDate() + "/" + dateTime.getMonth() + 1 + "/" + dateTime.getFullYear();
        else
            return dateTime;
    }

    function removeSplashNavigation() {
        /// <signature helpKeyword="helpers.removeSplashNavigation">
        /// <summary locid="helpers.removeSplashNavigation">
        /// Remove splash screen page from navigation history.
        /// </summary>
        /// </signature>
        var splash = "/pages/splash/splash.html";
        var restore = "/pages/restore/restore.html";

        WinJS.Navigation.history.backStack.forEach(function (history) {
            if (history.location == splash || history.location == restore)
                WinJS.Navigation.history.backStack.splice(WinJS.Navigation.history.backStack.indexOf(history), 1);
        });
    }

    function getRandomImage(item, wide) {
        /// <signature helpKeyword="helpers.getRandomImage">
        /// <summary locid="helpers.getRandomImage">
        /// return random images from note images collection or if collection is empty then return default image based on note type.
        /// </summary>
        /// <param name="item">note item</param>
        /// <param name="wide">true for wide format.</param>
        /// <returns>image path - string</returns>
        /// </signature>
        if (item === null) return;
        if (item.type === Data.Model.NoteTypes.notebook) {
            if (item.totalChildren === 0)
                return getPreviewImage(item.type, wide);
            else {
                var allImages = [];
                item.notes.forEach(function (note) {
                    note.images.forEach(function (img) {
                        allImages.push(img);
                    });
                });
                if (allImages.length === 0)
                    return getPreviewImage(item.type, wide);
                else
                    return allImages[Math.floor(Math.random() * allImages.length)];
            }
        }
        else {
            if (item.images !== undefined && item.images.length != 0)
                return item.images[Math.floor(Math.random() * item.images.length)];
            else
                return getPreviewImage(item.type, wide);
        }
    }

    function getPreviewImage(type, tile, wide) {
        /// <signature helpKeyword="helpers.getPreviewImage">
        /// <summary locid="helpers.getPreviewImage">
        /// return default image for note based of type.
        /// </summary>
        /// <param name="type">note type</param>
        /// <param name="tile">true for tile image format</param>
        /// <param name="wide">true for wide format.</param>
        /// <returns>image path - string</returns>
        /// </signature>
        switch (type) {
            case Data.Model.NoteTypes.food:
                return wide == true ? "ms-appx:///assets/tiles/food-wide.png" : tile ? "ms-appx:///assets/tiles/food-small.png" : "ms-appx:///assets/tiles/food.png";
            case Data.Model.NoteTypes.todo:
                return wide == true ? "ms-appx:///assets/tiles/todo-wide.png" : tile ? "ms-appx:///assets/tiles/todo-small.png" : "ms-appx:///assets/tiles/todo.png";
            case Data.Model.NoteTypes.notebook:
                return wide == true ? "ms-appx:///assets/tiles/notebook-wide.png" : tile ? "ms-appx:///assets/tiles/notebook-small.png" : "ms-appx:///assets/tiles/notebook.png";
            default:
                return wide == true ? "ms-appx:///assets/tiles/note-wide.png" : tile ? "ms-appx:///assets/tiles/note-small.png" : "ms-appx:///assets/tiles/note.png";
        }
    }

    function getClientCoordinates(cssUnits) {
        // Translate css coordinates to system coordinates.
        return cssUnits * (96 / window.screen.deviceXDPI);
    };


    WinJS.Namespace.define("helpers",
        {
            getMousePosition: getMousePosition,
            removeSplashNavigation: removeSplashNavigation,
            generateKey: generateKey,
            getRandomImage: getRandomImage,
            getPreviewImage: getPreviewImage,
            toDateOnly: toDateOnly,
        });
})();