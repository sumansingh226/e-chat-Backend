import moment from "moment";

export const DateFormat = (date: Date | null) => {
    return moment(date).isValid() && moment(date).format("");
};
