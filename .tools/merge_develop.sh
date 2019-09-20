#!/bin/bash

RELEASE=false
BRANCH_ORIGEN="develop"
if [ -z "$1" ]; then 
    KEY=`date +%Y-%m-%d`
    RELEASE=false
else
    KEY="${1}"
    RELEASE=true
fi
BRANCH_NAME="LN/merge/${KEY}"
BRANCH_TEMP="LN/merge/${KEY}-temp"

if [ "${BRANCH_ORIGEN}" == "develop" ]; then
    BRANCH_RELEASE="${BRANCH_NAME}/RELEASE"
else
    BRANCH_RELEASE="${BRANCH_NAME}/${BRANCH_ORIGEN}"
fi

GRUPOS=( "LN/NOTA" "LN/HOME" "LN/COMMON" "OTT" )
GRUPOS=( "LN/COMMON" )

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
    echo ">>>> Creo RELEASE desde ${BRANCH_ORIGEN}" &&
    git checkout ${BRANCH_ORIGEN} &&
    git checkout -q -b ${BRANCH_RELEASE};
else
    echo ">>>> Cambio a ${BRANCH_RELEASE}" &&
    git checkout ${BRANCH_RELEASE};
fi

echo "------------------------------------------" &&
echo "" &&

for NAME in "${GRUPOS[@]}"
do : 
    echo ">>>> Creo temporal desde ${NAME}" &&
    git checkout ${NAME}/develop &&
    git checkout -b ${BRANCH_TEMP}/${NAME} &&

    echo "  >>>> Actualizo temporal con RELEASE" &&
    git merge ${BRANCH_RELEASE} &&

    echo "  >>>> Creo RELEASE para ${NAME}" &&
    git checkout ${BRANCH_RELEASE} &&
    git checkout -b ${BRANCH_RELEASE}-para/${NAME} &&

    echo "  >>>> Aplico ${NAME} al RELEASE" &&
    git merge ${BRANCH_TEMP}/${NAME} &&

    echo "  >>>> Aplico RELEASE" &&
    git checkout ${BRANCH_RELEASE} &&
    git merge ${BRANCH_RELEASE}-para/${NAME} &&

    echo "  >>>> Actualizo ${NAME}" &&
    git checkout ${NAME}/develop &&
    git merge ${BRANCH_RELEASE} &&

    echo "  >>>> ELIMINO TEMPS" &&
    git branch -d ${BRANCH_RELEASE}-para/${NAME} &&
    git branch -d ${BRANCH_TEMP}/${NAME} || exit;

done && 

if [ $RELASE ]; then

    echo "  >>>> Aplico RELEASE FINAL" &&
    git checkout ${BRANCH_ORIGEN} &&
    git merge ${BRANCH_RELEASE} &&

    echo "  >>>> ELIMINO RELEASE" &&
    git branch -d ${BRANCH_RELEASE} || exit;

fi &&

echo " >>> FIN <<< "

exit
