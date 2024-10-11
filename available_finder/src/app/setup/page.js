"use client"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useEffect, useState } from "react";
import { PlusCircle, Trash } from "lucide-react";

export default function Setup() {
    const [groups, setGroups] = useState(null);
    const [groupNames, setGroupNames] = useState(null);
    const [needRefresh, setNeedRefresh] = useState(false);

    let addGroupWrapper = () => {
        addGroup(groups, setGroups, setNeedRefresh,groupNames,setGroupNames);
    }

    let deleteGroupWrapper = (i) => {
        console.log("hey")
        deleteGroup(groups, setGroups, setNeedRefresh, i);
    }

    useEffect(() => {
        setNeedRefresh(false);
    }, [needRefresh])

    return (<main className="bg-black h-screen w-screen flex justify-center">
        <Card className="w-[640px] h-[480px] mt-[50px] bg-slate-200 flex flex-col align-center">
            <CardHeader>
                <CardTitle className="text-center">Configuration du logiciel</CardTitle>
                <CardDescription className="text-center">Cet utilitaire va vous permettre de rapidement mettre en place le logiciel.</CardDescription>
            </CardHeader>
            <div className="flex justify-center m-[10px]">
                <ScrollArea className="h-72 w-[640px] rounded-md border">
                    <Table className="max-h-[480px]">
                        <TableCaption>Liste des classes</TableCaption>
                        <TableHeader className="bg-black">
                            <TableRow>
                                <TableHead className="text-white font-bold text-center">Nom</TableHead>
                                <TableHead className="text-white text-center">Années restantes avant d'obtenir le bac</TableHead>
                                <TableHead className="">
                                    <Popover>      
                                        <PopoverTrigger asChild>
                                            <Button>
                                                <PlusCircle color="white" />
                                            </Button>
                                        </PopoverTrigger> 
                                        <PopoverContent className="w-80">
                                            <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <h4 className="font-medium leading-none">Ajouter un groupe</h4>
                                                <p className="text-sm text-muted-foreground">
                                                Ajoute une classe a la base de données
                                                </p>
                                            </div>
                                            <div className="grid gap-2">
                                                <div className="grid grid-cols-3 items-center gap-4">
                                                <Label htmlFor="name">Nom</Label>
                                                <Input
                                                    id="name"
                                                    defaultValue="2E1"
                                                    className="col-span-2 h-8"
                                                />
                                                </div>
                                                <div className="grid grid-cols-3 items-center gap-4">
                                                <Label htmlFor="level">Année avant le bac</Label>
                                                <Input
                                                    id="level"
                                                    defaultValue="2"
                                                    className="col-span-2 h-8"
                                                />
                                                </div>
                                            </div>
                                            <Button onClick={addGroupWrapper}>Ajouter</Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        {groups != null && (<TableBody className="max-h-[480px]">
                                {groups.map((group, i) => {
                                    let r = () => (deleteGroupWrapper(i));
                                    return (<TableRow key={i}>
                                        <TableCell className="font-bold text-center">{group.name}</TableCell>
                                        <TableCell className="text-center">{group.level}</TableCell>
                                        <TableCell><Button onClick={r}><Trash /></Button></TableCell>
                                    </TableRow>)
                                })}
                        </TableBody>)
                        }
                    </Table>
                </ScrollArea>
            </div>
        </Card>
    </main>);
}

let addGroup = (groups, setGroups, setNeedRefresh) => {
    if(groups == null) {
        groups = [];
    }
    const allGroups = groups;
    let newGroup;
    newGroup = {
        level: document.getElementById("level")?.value,
        name: document.getElementById("name")?.value
    };
    allGroups.push(newGroup);
    setGroups(allGroups);
    setNeedRefresh(true);
}

let deleteGroup = (groups, setGroups, setNeedRefresh, i) => {
    const allGroups = groups;
    console.log(i)
    allGroups.splice(i,1);
    console.log(allGroups);
    setGroups(allGroups);
    setNeedRefresh(true);
}