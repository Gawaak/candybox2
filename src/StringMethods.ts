export default {
    addAt: function (subject: string, index: number, text: string): string {
        return subject.substr(0, index) + text + subject.substr(index);
    },

    addChineseSpaces: function (str: string): string {
        var newStr: string = "";
        for (var i = 0; i < Math.floor(str.length / 3); i++) {
            newStr += " ";
        }
        newStr += str;
        for (var i = 0; i < Math.floor(str.length / 3); i++) {
            newStr += " ";
        }
        return newStr;
    },

    fillWith: function (s: string, characters: string, howMuch: number): string {
        var str: string = "";
        for (var i = 0; i < howMuch; i++) {
            str += characters;
        }
        return s.concat(str);
    },

    replaceAt: function (str: string, index: number, text: string): string {
        return str.substr(0, index) + text + str.substr(index + text.length);
    },

    pad: function(str: string, width: number) {
        let s = ""

        for(let i = 0; i < (width - str.length) * 0.5 - 1; i++) {
            s += " "
        }

        return s + str
    }
}