#!/bin/bash


if [ -z "$1" ]; then echo "Falta parametro 1: $0 <EQUIPO>"; exit; fi
if [ -z "$2" ]; then echo "Falta parametro 2: $0 $1 "; exit; fi

MERGE="${2}"
DEVELOP="develop"
TEAM="LN/${1}/develop"

if [ -z "$3" ]; then 
    NUEVO="LN/${1}/merge/${DATE}"
    echo "Falta parametro 3: ${0} ${1} ${2} <NOMBRE NUEVO BRANCH>"
    echo " > USANDO DEFAULT: ${NUEVO}"
else
    NUEVO="${3}"
fi

echo "MERGE:${MERGE}" &&
echo "DEVELOP:${DEVELOP}" &&
echo "TEAM:${TEAM}" &&
echo "NUEVO:${NUEVO}" &&

echo ">>>> UPDATE BRANCHES <<<<" &&
git checkout develop && git fetch && git pull &&
git checkout LN/HOME/develop && git fetch && git pull &&
git checkout LN/NOTA/develop && git fetch && git pull &&
git checkout LN/COMMON/develop && git fetch && git pull &&
git checkout ${DEVELOP} && git fetch && git pull &&
git checkout ${TEAM} && git fetch && git pull &&
git checkout ${MERGE} && git fetch && git pull &&

echo "" &&
echo "------------------------------------------" &&
echo "" &&

echo " > > > Actualizo ${TEAM} desde ${DEVELOP}" &&
git checkout ${TEAM} && 
git merge ${DEVELOP} --verbose && 
git push --verbose && 

if [ `git branch --list ${NUEVO}` ]
then
    echo " > > > Actualizo ${NUEVO} desde ${TEAM}"
    git checkout ${NUEVO} &&
    git merge ${TEAM};
else
    echo " > > > Creo ${NUEVO} desde ${TEAM}"
    git checkout ${TEAM} &&
    git checkout -b ${NUEVO};
fi &&

echo " > > > Merge desde ${MERGE} a ${NUEVO}" &&
git merge ${MERGE} --verbose &&

if [ "${4}" == "DEPLOY" ]; then 

    echo " > > > Merge desde ${NUEVO} a ${TEAM}" &&
    git checkout ${TEAM} && 
    git merge ${NUEVO} --verbose && 
    git push --verbose && 

    echo " > > > ELIMINO ${NUEVO}" &&
    git branch -d ${NUEVO} &&

    echo " > > > Merge desde ${TEAM} a develop" &&
    git checkout develop &&
    git merge ${TEAM} --verbose && 
    git push --verbose;
else
    echo "  >  >  > Agregar DEPLOY como cuarto parametro para impactar en ramas devs";
    echo "  >  >  > ${0} ${1} ${2} ${3} DEPLOY"
fi &&

npm run test &&
npx fusion zip &&


# # .tools/merge_final.sh NOTA LN/NOTA/2019/09/S17/TituloRecetas   
# # .tools/merge_final.sh NOTA LN/NOTA/2019/09/s17/ValidacionPorcionTiempo

# # git checkout LN/NOTA/develop && git merge LN/NOTA/merge/2019-09-17-17-47 --verbose && git push --verbose
# # git branch -d LN/NOTA/merge/2019-09-17-17-47

# # git checkout develop
# # git merge LN/NOTA/develop --verbose
# # git push --verbose

echo " >>> FIN <<< "
