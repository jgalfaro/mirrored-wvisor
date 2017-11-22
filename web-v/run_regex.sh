#!/bin/bash

if [ $# -ne 3 ]; then
    echo "Usage: $0 <input_file> <output_file>"
    echo "  <input_file>: File with the values to be typed."
    echo "  <output_file>: File where the typed values will be stored."
    echo "  <outfile_prefix>: working prefix for temporary files."
    exit 0
else
    vals_file=$1
    output_file=$2
    outfile_prefix=$3
fi

# outfile_prefix="tmp/tmp_typing"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

quote="'"
echo -n "   [+] URL redirection..."
# initial: typing/value_parser.py $vals_file '(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'$quote'\\\+&amp;%\$\#\=~_\-]+))*' url_redirection $outfile_prefix"_1" &> /dev/null
# Better: (https?://)?(([\w!~*'().&=+$%-]+: )?[\w!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([\w!~*'()-]+\.)*([\w^-][\w-]{0,61})?[\w]\.[a-z]{2,6})(:[0-9]{1,4})?((/*)|(/+[\w!~*'().;?:@&=+$,%#-]+)+/*)
#typing/value_parser.py $vals_file '(https?://)?(([\w!~*$quote().&=+$%-]+: )?[\w!~*$quote().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([\w!~*$quote()-]+\.)*([\w^-][\w-]{0,61})?[\w]\.[a-z]{2,6})(:[0-9]{1,4})?((/*)|(/+[\w!~*$quote().;?:@&=+$,%#-]+)+/*)' url_redirection $outfile_prefix"_1" &> /dev/null
#sed -r 's/(https?\:\/\/)?(([\w!~*$quote().&=+$%-]+:)?[\w!~*$quote().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([\w!~*$quote()-]+\.)*([\w^-][\w-]{0,61})?[\w]\.[a-z]{2,6})(:[0-9]{1,4})?((\/*)|(\/+[\w!~*$quote().;?:@&=+$,%#-]+)+\/*)/url_redirection/ig' $vals_file > $outfile_prefix"_1"
sed -r 's/^(https?\:\/\/)?(([a-z0-9~*$quote().&=+$%-]+:)?[a-z0-9!~*$quote().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([a-z0-9]!~*$quote()-]+\.)*([a-z0-9^-][a-z0-9-]{0,61})?[a-z0-9]\.[a-z]{2,6})(:[0-9]{1,4})?((\/*)|(\/+[a-z0-9!~*$quote().;?:@&=+$,%#-]+)+\/*)$/url_redirection/ig' $vals_file > $outfile_prefix"_1"
echo " DONE"

echo -n "   [+] Md5..."
#`typing/value_parser.py $outfile_prefix"_1" '(\b[A-Fa-f0-9]{32}\b)'  md5 $outfile_prefix"_2" &> /dev/null` 
sed -r 's/^(\b[a-f0-9]{32}\b)$/md5/ig' $outfile_prefix"_1" > $outfile_prefix"_2"
echo " DONE"

echo -n "   [+] Sha1..."
#`typing/value_parser.py $outfile_prefix"_2" '(\b[A-Fa-f0-9]{40}\b)'  sha1 $outfile_prefix"_3" &> /dev/null` 
sed -r 's/^[a-f0-9]{40}$/sha1/ig' $outfile_prefix"_2" > $outfile_prefix"_3"
echo " DONE"

echo -n "   [+] Base64..."
sed -r 's/^([A-Za-z0-9\-\_]{4}){2,}([A-Za-z0-9\-\_]{2}[AEIMQUYcgkosw048]=|[A-Za-z0-9\-\_][AQgw]==)$/base64/g' $outfile_prefix"_3" > $outfile_prefix"_4" 
#`typing/value_parser.py $outfile_prefix"_4" "^(?:[A-Za-z0-9+/]{4}){2,}(?:[A-Za-z0-9+/]{2}[AEIMQUYcgkosw048]=|[A-Za-z0-9+/][AQgw]==)$"  base64 $outfile_prefix"_5" &> /dev/null` 
sed -r 's/^([A-Za-z0-9+/]{4}){2,}([A-Za-z0-9+/]{2}[AEIMQUYcgkosw048]=|[A-Za-z0-9+/][AQgw]==)$/base64/g' $outfile_prefix"_4" > $outfile_prefix"_5"
# `typing/value_parser.py $outfile_prefix"_5" "(?:[A-Za-z0-9\-_]{4}){2,}(?:[A-Za-z0-9\-_]{2}[AEIMQUYcgkosw048]=|[A-Za-z0-9\-_][AQgw]==)"  base64 $outfile_prefix"_6" &> /dev/null` 
sed -r 's/^([A-Za-z0-9\-\_]{4}){2,}([A-Za-z0-9\-\_]{2}[AEIMQUYcgkosw048]=|[A-Za-z0-9\-\_][AQgw]==)$/base64/g' $outfile_prefix"_5" > $outfile_prefix"_6"
# `typing/value_parser.py $outfile_prefix"_6" "(?:[A-Za-z0-9+/]{4}){2,}(?:[A-Za-z0-9+/]{2}[AEIMQUYcgkosw048]=|[A-Za-z0-9+/][AQgw]==)"  base64 $outfile_prefix"_7" &> /dev/null` 
sed -r 's/^([A-Za-z0-9+/]{4}){2,}([A-Za-z0-9+/]{2}[AEIMQUYcgkosw048]=|[A-Za-z0-9+/][AQgw]==)$/base64/g' $outfile_prefix"_6" > $outfile_prefix"_7"
echo " DONE"

echo -n "   [+] Integer..."
#`typing/value_parser.py $outfile_prefix"_7" "^[-+]?\d+$"  integer $outfile_prefix"_8" &> /dev/null` 
sed -r 's/^[-\+]?[0-9]+$/integer/g' $outfile_prefix"_7" > $outfile_prefix"_8"
echo " DONE"

echo -n "   [+] Float..."
#`typing/value_parser.py $outfile_prefix"_8" "^[-+]?[0-9]*\.[0-9]+([eE][-+]?[0-9]+)?$" float $outfile_prefix"_9" &> /dev/null` 
sed -r 's/^[-\+]?[0-9]*\.[0-9]+([eE][-+]?[0-9]+)?$/float/gi' $outfile_prefix"_8" > $outfile_prefix"_9"
echo " DONE"

echo -n "   [+] Boolean..."
#`typing/value_parser.py $outfile_prefix"_9" "(?i)^(yes|no|true|false)$" bool $outfile_prefix"_10" &> /dev/null` 
sed -r 's/^(yes|no|true|false)$/bool/gi' $outfile_prefix"_9" > $outfile_prefix"_10"
echo " DONE"

echo -n "   [+] Resolution..."
#`typing/value_parser.py $outfile_prefix"_10" "^\d+x\d+x\d+?$" resolution $outfile_prefix"_11" &> /dev/null` 
sed -r 's/^[0-9]+x[0-9]+(x[0-9]+)?$/resolution/gi' $outfile_prefix"_10" > $outfile_prefix"_11"
echo " DONE"

echo -n "   [+] Hex encoded..."
#`typing/value_parser.py $outfile_prefix"_11" '^((\\\x)[a-f0-9])+' hex_encoded $outfile_prefix"_12" &> /dev/null` 
sed -r 's/^((\\)?\\x[a-f0-9]{1,2})+$/hex_encoded/gi' $outfile_prefix"_11" > $outfile_prefix"_12"
echo " DONE"

echo -n "   [+] MAC address..."
#`typing/value_parser.py $outfile_prefix"_12" "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$" mac_addr $outfile_prefix"_13" &> /dev/null` 
sed -r 's/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/mac_addr/g' $outfile_prefix"_12" > $outfile_prefix"_13"
echo " DONE"

echo -n "   [+] File path..."
#`typing/value_parser.py $outfile_prefix"_13" '([a-zA-Z]\:\\\{1,4}(.*\\\{1,4})+(((.*\..*)|(.*))?))|(^\/(.*\/)+(((.*\.*)|(.*))?))' file_path $outfile_prefix"_14" &> /dev/null` 
sed -r "s/^([a-zA-Z]\:\\\{1,4}(.*\\\{1,4})+(((.*\..*)|(.*))?))|(^\/(.*\/)+(((.*\.*)|(.*))?))$/file_path/g" $outfile_prefix"_13" > $outfile_prefix"_14"
echo " DONE"

echo -n "   [+] Timestamp..."
#`typing/value_parser.py $outfile_prefix"_14" "([0-9]{4}[\/-][0-9]{1,2}[\/-][0-9]{1,2})?\s([0-9]{1,2}\:[0-9]{1,2}\:[0-9]{1,2})|([0-9]{4}[\/-][0-9]{1,2}[\/-][0-9]{1,2})(\s([0-9]{1,2}\:[0-9]{1,2}\:[0-9]{1,2}))?" timestamp $outfile_prefix"_15" &> /dev/null` 
sed -r 's/^([0-9]{4}[\/-][0-9]{1,2}[\/-][0-9]{1,2})?\s([0-9]{1,2}\:[0-9]{1,2}\:[0-9]{1,2})|([0-9]{4}[\/-][0-9]{1,2}[\/-][0-9]{1,2})(\s([0-9]{1,2}\:[0-9]{1,2}\:[0-9]{1,2}))?$/timestamp/g' $outfile_prefix"_14" > $outfile_prefix"_15"
echo " DONE"

echo -n "   [+] Country code..."
#`typing/value_parser.py $outfile_prefix"_15" "(?i)^(AB|AA|AF|SQ|AM|AR|HY|AS|AY|AZ|BA|EU|BN|DZ|BH|BI|BR|BG|MY|BE|KM|CA|ZH|CO|HR|CS|DA|NL|EN|EO|ET|FO|FJ|FI|FR|FY|GD|GL|KA|DE|EL|KL|GN|GU|HA|IW|HI|HU|IS|IN|IA|IE|IK|GA|IT|JA|JW|KN|KS|KK|RW|KY|RN|KO|KU|LO|LA|LV|LN|LT|MK|MG|MS|ML|MT|MI|MR|MO|MN|NA|NE|NO|OC|OR|OM|PS|FA|PL|PT|PA|QU|RM|RO|RU|SM|SG|SA|SR|SH|ST|TN|SN|SD|SI|SS|SK|SL|SO|ES|SU|SW|SV|TL|TG|TA|TT|TE|TH|BO|TI|TO|TS|TR|TK|TW|UK|UR|UZ|VI|VO|CY|WO|XH|JI|YO|ZU)$" country_code $outfile_prefix"_16" &> /dev/null` 
sed -r 's/(AB|AA|AF|SQ|AM|AR|HY|AS|AY|AZ|BA|EU|BN|DZ|BH|BI|BR|BG|MY|BE|KM|CA|ZH|CO|HR|CS|DA|NL|EN|EO|ET|FO|FJ|FI|FR|FY|GD|GL|KA|DE|EL|KL|GN|GU|HA|IW|HI|HU|IS|IN|IA|IE|IK|GA|IT|JA|JW|KN|KS|KK|RW|KY|RN|KO|KU|LO|LA|LV|LN|LT|MK|MG|MS|ML|MT|MI|MR|MO|MN|NA|NE|NO|OC|OR|OM|PS|FA|PL|PT|PA|QU|RM|RO|RU|SM|SG|SA|SR|SH|ST|TN|SN|SD|SI|SS|SK|SL|SO|ES|SU|SW|SV|TL|TG|TA|TT|TE|TH|BO|TI|TO|TS|TR|TK|TW|UK|UR|UZ|VI|VO|CY|WO|XH|JI|YO|ZU)$/country_code/gi' $outfile_prefix"_15" > $outfile_prefix"_16"
echo " DONE"

# keyword -> ?keyword -> sed on all the rest -> keyword
echo -n "   [+] Checking values with no type..."
`${DIR}/typing/final_step.py $outfile_prefix"_16" no_type $output_file`
#sed -r 's/^(&|url_redirection|md5|sha1|base64|integer|float|bool|resolution|hex_encoded|mac_addr|file_path|timestamp|country_code)$/\?\1/g' $outfile_prefix"_16" > $outfile_prefix"_17"
#sed -r 's/^[^\?]*$/no_type/gi' $outfile_prefix"_17" > $outfile_prefix"_18"
# Clean lines without any type
#sed -r 's/^\?(&|url_redirection|md5|sha1|base64|integer|float|bool|resolution|hex_encoded|mac_addr|file_path|timestamp|country_code)$/\1/g' $outfile_prefix"_18" > $output_file

echo " DONE"
`rm  ${outfile_prefix}*`
