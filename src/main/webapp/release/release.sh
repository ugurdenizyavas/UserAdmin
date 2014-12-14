#!/bin/bash

if [ -z "$1" ]; then
	echo "Usage: $0 <svn path to project>"
	exit 1
fi

#

svnpath="$1"

releasedir="/tmp/x/$( basename "$svnpath" )/"

rm -Rf "$releasedir"

mkdir -p "$releasedir"

cd "$releasedir" || exit 1

svn co "$svnpath" .

mvn release:clean release:prepare release:perform

