#!/bin/bash


if [ -z "$1" ]; then echo "Falta parametro 1: $0 <EQUIPO>"; exit; fi
if [ -z "$2" ]; then echo "Falta parametro 2: $0 $1 <BRANCH>"; exit; fi

MERGE="${2}"
DEVELOP="develop"
TEAM="LN/${1}/develop"

if [ -z "$3" ]; then 
    DATE=`date +%Y-%m-%d-%H-%M`
    NUEVO="LN/${1}/merge/${DATE}"
    echo "Falta parametro 3: ${0} ${1} ${2} <NOMBRE NUEVO BRANCH>"
    echo " > USANDO DEFAULT: ${NUEVO}"
else
    NUEVO="${3}"
fi

echo "INICIANDO DEPLOY:  ${MERGE} | ${DEVELOP} | ${TEAM} | ${NUEVO}" >> .tools/log.txt &&
echo ">> INICIANDO <<" &&
echo " >     TEAM: ${TEAM}" &&
echo " >    MERGE: ${MERGE}" &&
echo " >    NUEVO: ${NUEVO}" &&
echo " >  DEVELOP: ${DEVELOP}" &&

echo ">>>> UPDATE BRANCHES <<<<" &&
if [ "${DEVELOP}" != "develop" ]; then
    git checkout develop >> .tools/log.txt && git fetch >> .tools/log.txt && git pull >> .tools/log.txt;
fi &&
if [ "${TEAM}" != "LN/HOME/develop" ]; then
    git checkout LN/HOME/develop >> .tools/log.txt && git fetch >> .tools/log.txt && git pull >> .tools/log.txt;
fi &&
if [ "${TEAM}" != "LN/NOTA/develop" ]; then
    git checkout LN/NOTA/develop >> .tools/log.txt && git fetch >> .tools/log.txt && git pull >> .tools/log.txt;
fi &&
if [ "${TEAM}" != "LN/COMMON/develop" ]; then
    git checkout LN/COMMON/develop >> .tools/log.txt && git fetch >> .tools/log.txt && git pull >> .tools/log.txt;
fi &&
git checkout ${DEVELOP} >> .tools/log.txt && git fetch >> .tools/log.txt && git pull >> .tools/log.txt &&
git checkout ${TEAM} >> .tools/log.txt && git fetch >> .tools/log.txt && git pull >> .tools/log.txt &&
git checkout ${MERGE} >> .tools/log.txt && git fetch >> .tools/log.txt && git pull >> .tools/log.txt &&

echo "" &&
echo "------------------------------------------" &&
echo "" &&

echo " > > > Actualizo ${TEAM} desde ${DEVELOP}" &&
git checkout ${TEAM} >> .tools/log.txt && 
git merge ${DEVELOP} --verbose >> .tools/log.txt && 
echo "  >  > PUSH a ${TEAM}" &&
git push --verbose >> .tools/log.txt && 

if [ `git branch --list ${NUEVO}` ]
then
    echo " > > > Actualizo ${NUEVO} desde ${TEAM}"
    git checkout ${NUEVO} >> .tools/log.txt &&
    git merge ${TEAM} >> .tools/log.txt;
else
    echo " > > > Creo ${NUEVO} desde ${TEAM}"
    git checkout ${TEAM} >> .tools/log.txt &&
    git checkout -b ${NUEVO} >> .tools/log.txt;
fi &&

echo " > > > Merge desde ${MERGE} a ${NUEVO}" &&
git merge ${MERGE} --verbose >> .tools/log.txt &&

if [ "${4}" == "MERGE" ] || [ "${4}" == "DEPLOY" ]; then 

    echo " > > > Merge desde ${NUEVO} a ${TEAM}" &&
    git checkout ${TEAM} >> .tools/log.txt && 
    git merge ${NUEVO} --verbose >> .tools/log.txt && 
    echo "  >  > PUSH a ${TEAM}" &&
    git push --verbose >> .tools/log.txt &&

    if [ "${4}" == "DEPLOY" ]; then 

        echo " > > > Merge desde ${TEAM} a develop" &&
        git checkout develop >> .tools/log.txt &&
        git merge ${TEAM} --verbose >> .tools/log.txt && 
        echo "  >  > PUSH a develop" &&
        git push --verbose >> .tools/log.txt &&
        
        echo " > > > ELIMINO ${NUEVO}" &&
        git branch -d ${NUEVO} >> .tools/log.txt &&

        npx fusion zip;
    fi
else
    echo "  >  >  > Agregar DEPLOY o MERGE como cuarto parametro para impactar en ramas devs";
    echo "  >  >  > ${0} ${1} ${2} ${3} DEPLOY"
fi &&

echo " >>> FIN <<< "
