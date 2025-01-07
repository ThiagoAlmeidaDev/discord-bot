module.exports = class Functions {

    /**
    * Converte milissegundos para um objeto de tempo.
    * 
    * @param {number} ms - Tempo em milissegundos.
    * @returns {Object} Objeto contendo dias, horas, minutos e segundos.
    */
    static convertMilliseconds(ms) {
        const seconds = ~~(ms / 1000);
        const minutes = ~~(seconds / 60);
        const hours = ~~(minutes / 60);
        const days = ~~(hours / 24);
        return { dias: days, horas: hours % 24, minutos: minutes % 60, segundos: seconds % 60 };
    }

    /**
    * Formata um objeto de tempo para uma string legível.
    * 
    * @param {Object} time - Objeto contendo dias, horas, minutos e segundos.
    * @returns {string} Tempo formatado como string.
    */
    static autoFormatTime(time) {
        return Object.entries(time)
            .filter(e => e[1])
            .map(e => ([e[0].slice(0, -1).padEnd(e[1] > 1 ? e[0].length : 0, 's'), e[1]]))
            .map((e, i, a) => (i === a.length - 1 && a.length > 1) ? `e ${e[1]} ${e[0]}` : (i === a.length - 2 || a.length === 1) ? `${e[1]} ${e[0]}` : `${e[1]} ${e[0]},`)
            .join(' ')
            || '0 segundos';
    }

    /**
    * Obtém o horário formatado (HH:MM) a partir de um timestamp.
    * 
    * @param {number} now - O timestamp atual.
    * @returns {string} Horário formatado.
    */
    static getFormattedTime(now) {
        const date = new Date(now);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    /**
    * Formata uma data a partir de um timestamp em segundos.
    * 
    * @param {Number} data - O timestamp em segundos.
    * @returns {String} A data formatada.
    */
    static formatDate(data) {
        const date = new Date(data);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); //mês retorna de 0 à 11
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} às ${hours}:${minutes}`;
    }

    /**
    * Pausa a execução por um determinado tempo.
    * @param {number} ms - Tempo em milissegundos.
    * @returns {Promise<void>}
    */

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
