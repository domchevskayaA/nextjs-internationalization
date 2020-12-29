import moment from 'moment-timezone';

export default function Date({
  dateString,
  locale,
}: {
  dateString: string;
  locale: string;
}) {
  moment.locale(locale);
  return <time dateTime={dateString}>{moment(dateString).format('lll')}</time>;
}
