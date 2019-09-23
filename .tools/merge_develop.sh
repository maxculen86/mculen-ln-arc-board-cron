#!/bin/bash

# GRUPOS=( "OTT" )
# GRUPOS=( "LN/NOTA" "LN/HOME" "LN/COMMON" )
GRUPOS=( "LN/NOTA" "LN/HOME" "LN/COMMON" "OTT" )

BRANCH_ORIGEN="develop"
MERGE=false
if [ "${1}" == "MERGE" ]; then 
    MERGE=true
fi
if [ "${1}" == "PUSH" ]; then 
    MERGE=true
    PUSH=true
fi

if [ -z "${2}" ]; then 
    KEY=`date +%Y-%m-%d`
else
    KEY="${2}"
fi

BRANCH_NAME="LN/merge/${KEY}"
BRANCH_TEMP="LN/merge/${KEY}-temp"

if [ "${BRANCH_ORIGEN}" == "develop" ]; then
    BRANCH_RELEASE="${BRANCH_NAME}/RELEASE"
else
    BRANCH_RELEASE="${BRANCH_NAME}/${BRANCH_ORIGEN}"
fi

echo ">>>> UPDATE BRANCHES <<<<" &&
git checkout -q develop && git fetch && git pull &&
for NAME in "${GRUPOS[@]}"
do : 
   git checkout -q ${NAME}/develop && git fetch && git pull || exit;
done && 

echo "------------------------------------------" &&
echo "" &&

if [ `git branch --list ${BRANCH_RELEASE}` ]
then
    echo ">>>> Cambio a ${BRANCH_RELEASE}" &&
    git checkout -q ${BRANCH_RELEASE};
else
    echo ">>>> Creo RELEASE ${BRANCH_RELEASE} desde ${BRANCH_ORIGEN}" &&
    git checkout -q ${BRANCH_ORIGEN} &&
    git checkout -q -b ${BRANCH_RELEASE};
fi &&

echo "------------------------------------------" &&
echo "" &&

for NAME in "${GRUPOS[@]}"
do : 
    echo ">>>> Creo temporal desde ${NAME}" &&
    git checkout -q ${NAME}/develop &&
    git checkout -q -b ${BRANCH_TEMP}/${NAME} &&

    echo "  >>>> Actualizo temporal con RELEASE" &&
    git merge ${BRANCH_RELEASE} &&

    echo "  >>>> Creo RELEASE para ${NAME}" &&
    git checkout -q ${BRANCH_RELEASE} &&
    git checkout -q -b ${BRANCH_RELEASE}-para/${NAME} &&

    echo "  >>>> Aplico ${NAME} al RELEASE" &&
    git merge ${BRANCH_TEMP}/${NAME} &&

    echo "  >>>> Aplico RELEASE" &&
    git checkout -q ${BRANCH_RELEASE} &&
    git merge ${BRANCH_RELEASE}-para/${NAME} &&

    echo "  >>>> Actualizo ${NAME}" &&
    git checkout -q ${NAME}/develop &&
    git merge ${BRANCH_RELEASE} &&

    if [ $PUSH ]; then
        git push --verbose;
    fi &&

    echo "  >>>> ELIMINO TEMPS" &&
    git branch -d ${BRANCH_RELEASE}-para/${NAME} &&
    git branch -d ${BRANCH_TEMP}/${NAME} || exit;

done && 

if [ $MERGE ]; then

    echo "" &&
    echo "" &&
    echo "  >>>>>>>>>>>>>>><<<<<<<<<<<<<<<" &&
    echo "  >>>> Aplico RELEASE FINAL <<<<" &&
    echo "  >>>>>>>>>>>>>>><<<<<<<<<<<<<<<" &&
    echo "" &&
    echo "" &&

    git checkout -q ${BRANCH_ORIGEN} &&
    git merge ${BRANCH_RELEASE} &&

    echo "  >>>> ELIMINO RELEASE" &&
    git branch -d ${BRANCH_RELEASE} || exit;
fi &&

if [ $PUSH ]; then
    echo "" &&
    echo "" &&
    echo "  >>>>>>><<<<<<<" &&
    echo "  >>>> PUSH <<<<" &&
    echo "  >>>>>>><<<<<<<" &&
    echo "" &&
    echo "" &&

    git checkout -q ${BRANCH_ORIGEN} &&
    git push --verbose;

fi &&

echo " >>> FIN <<< "

exit
