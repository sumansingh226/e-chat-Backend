import moment from "moment";
import strings from "../Constants/StringsConstants";

export const DateFormat = (date: Date | null) => {
    return moment(date).isValid() && moment(date).format(strings.dateFormat);
};
