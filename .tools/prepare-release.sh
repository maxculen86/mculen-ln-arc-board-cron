#!/bin/bash

INICIO=`git branch | grep \* | cut -d ' ' -f2`
DEVELOP="develop"
GRUPOS=( "LN/NOTA" "LN/HOME" "LN/COMMON" "OTT" )

if [ -z "$1" ]; then 
    KEY=`date +%Y-%m-%d-%H-%M`
    RELEASE="release/${KEY}"
else
    RELEASE="${1}"
fi
if [ `git branch --list ${RELEASE}` ]; then
    EXISTE=true;
else
    EXISTE=false;
fi

echo " · INICIO: ${INICIO}"
echo " · DEVELOP: ${DEVELOP}"
echo " · GRUPOS: ${GRUPOS}"
echo " · RELEASE: ${RELEASE} ($EXISTE)"

if [ $EXISTE ]
then
    echo ">>>> Cambio a ${RELEASE}" &&
    git checkout -q ${RELEASE} || exit;
else
    echo ">>>> Creo RELEASE ${RELEASE}" &&
    git checkout -q -b ${RELEASE} || exit;
fi &&

echo ">>>> UPDATE BRANCHES <<<<" &&
git checkout -q ${DEVELOP} &&
git fetch &&
git pull &&
for NAME in "${GRUPOS[@]}"
do : 
    echo " > > UPDATE ${NAME} < <" &&
    git checkout -q ${NAME}/develop &&
    git fetch --verbose &&
    git pull &&

    echo "  >  > MERGE A ${RELEASE} <  <" &&
    git checkout -q ${RELEASE} &&
    git merge ${NAME}/develop --verbose || exit;
done && 

git push --set-upstream origin ${RELEASE} &&

echo " >>> FIN <<< "
