#!/bin/bash

BRANCH_ORIGEN="develop"
BRANCH_NAME="LN/release/${1}"
BRANCH_MERGE_BASE="LN/release/${1}-merged-from"
BRANCH_RELEASE="${BRANCH_NAME}/${BRANCH_ORIGEN}"

echo ">>>> UPDATE BRANCHES <<<<" &&
git checkout ${BRANCH_ORIGEN} && git fetch --verbose && git pull --verbose &&
git checkout develop && git fetch --verbose && git pull --verbose &&
git checkout LN/NOTA/develop && git fetch --verbose && git pull --verbose &&
git checkout LN/HOME/develop && git fetch --verbose && git pull --verbose && 
git checkout OTT/develop && git fetch --verbose && git pull --verbose && 
git checkout LN/COMMON/develop && git fetch --verbose && git pull --verbose &&

echo "------------------------------------------" &&

echo ">>>> Merge desde ${BRANCH_ORIGEN} a ${BRANCH_MERGE_BASE}/COMMON <<<<" &&
git checkout ${BRANCH_ORIGEN} &&
git checkout -q -b ${BRANCH_MERGE_BASE}/COMMON --no-track ${BRANCH_ORIGEN} &&
git merge LN/COMMON/develop --verbose &&

echo " > ------------------------------------ <" &&
echo ">>>> Merge desde ${BRANCH_ORIGEN} a ${BRANCH_MERGE_BASE}/NOTA <<<<" &&
git checkout ${BRANCH_ORIGEN} &&
git checkout -q -b ${BRANCH_MERGE_BASE}/NOTA --no-track ${BRANCH_ORIGEN} &&
git merge LN/NOTA/develop --verbose &&

echo " > ------------------------------------ <" &&
echo ">>>> Merge desde ${BRANCH_ORIGEN} a ${BRANCH_MERGE_BASE}/HOME <<<<" &&
git checkout ${BRANCH_ORIGEN} &&
git checkout -q -b ${BRANCH_MERGE_BASE}/HOME --no-track ${BRANCH_ORIGEN} &&
git merge LN/HOME/develop --verbose &&

echo " > ------------------------------------ <" &&
echo ">>>> Merge desde ${BRANCH_ORIGEN} a ${BRANCH_MERGE_BASE}/OTT <<<<" &&
git checkout ${BRANCH_ORIGEN} &&
git checkout -q -b ${BRANCH_MERGE_BASE}/OTT --no-track ${BRANCH_ORIGEN} &&
git merge OTT/develop --verbose &&
echo " > ------------------------------------ <" &&

echo ">>>> CREO BRANCH ${BRANCH_RELEASE} <<<<<" &&
git checkout -q -b ${BRANCH_RELEASE} --no-track ${BRANCH_ORIGEN} &&

echo ">>>> Merge desde ${BRANCH_MERGE_BASE}/COMMON a ${BRANCH_RELEASE} <<<<" &&
git merge ${BRANCH_MERGE_BASE}/COMMON --verbose &&

echo ">>>> Merge desde ${BRANCH_MERGE_BASE}/NOTA a ${BRANCH_RELEASE} <<<<" &&
git merge ${BRANCH_MERGE_BASE}/NOTA --verbose &&

echo ">>>> Merge desde ${BRANCH_MERGE_BASE}/HOME a ${BRANCH_RELEASE} <<<<" &&
git merge ${BRANCH_MERGE_BASE}/HOME --verbose &&

echo ">>>> Merge desde ${BRANCH_MERGE_BASE}/OTT a ${BRANCH_RELEASE} <<<<" &&
git merge ${BRANCH_MERGE_BASE}/OTT --verbose &&

echo " > ------------------------------------ <" &&

git checkout ${BRANCH_RELEASE} &&
echo ">>> PUSH ${BRANCH_RELEASE} <<<<" &&

git push --set-upstream origin ${BRANCH_RELEASE} &&
echo " > ------------------------------------ <" &&

echo ">>> Merge desde ${BRANCH_RELEASE} a ${BRANCH_MERGE_BASE}/COMMON <<<<" &&
git checkout ${BRANCH_MERGE_BASE}/COMMON &&
git merge ${BRANCH_RELEASE} &&
echo " > ------------------------------------ <" &&

echo ">>> Merge desde ${BRANCH_RELEASE} a ${BRANCH_MERGE_BASE}/NOTA <<<<" &&
git checkout ${BRANCH_MERGE_BASE}/NOTA &&
git merge ${BRANCH_RELEASE} &&
echo " > ------------------------------------ <" &&

echo ">>> Merge desde ${BRANCH_RELEASE} a ${BRANCH_MERGE_BASE}/HOME <<<<" &&
git checkout ${BRANCH_MERGE_BASE}/HOME &&
git merge ${BRANCH_RELEASE} &&
echo " > ------------------------------------ <" &&

echo ">>> Merge desde ${BRANCH_RELEASE} a ${BRANCH_MERGE_BASE}/OTT <<<<" &&
git checkout ${BRANCH_MERGE_BASE}/OTT &&
git merge ${BRANCH_RELEASE} &&
echo " > ------------------------------------ <" &&

echo "Borrando ${BRANCH_MERGE_BASE}/*" &&
git branch -d ${BRANCH_MERGE_BASE}/COMMON &&
git branch -d ${BRANCH_MERGE_BASE}/NOTA &&
git branch -d ${BRANCH_MERGE_BASE}/HOME &&
git branch -d ${BRANCH_MERGE_BASE}/OTT &&

git checkout ${BRANCH_RELEASE} &&

echo " >>> FIN <<< "