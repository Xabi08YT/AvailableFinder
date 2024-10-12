"use client"
//UI Components
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

// Technical components
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast"

// Icons
import { PlusCircle, Trash } from "lucide-react";

export default function Setup() {
    const [groups, setGroups] = useState(null);
    const [groupNames, setGroupNames] = useState(null);
    const [needRefresh, setNeedRefresh] = useState(false);
    const { toast } = useToast();

    // Wrappers
    let addGroupWrapper = () => {
        addGroup(groups, setGroups, setNeedRefresh,groupNames,setGroupNames, toast);
    }

    let deleteGroupWrapper = (i) => {
        deleteGroup(groups, setGroups, setNeedRefresh, i,groupNames,setGroupNames, toast);
    }

    // Self-refresh
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

let addGroup = (groups, setGroups, setNeedRefresh, groupNames, setGroupNames, toast) => {
    // Avoiding any issues with null..
    if(groups == null) {
        groups = [];
    }

    if(groupNames == null) {
        groupNames = [];
    }

    // Preparing local variables to update everything locally
    const allGroups = groups;
    const allGroupNames = groupNames;

    // Retreiving information given by the user
    let newGroup;
    newGroup = {
        level: document.getElementById("level")?.value,
        name: document.getElementById("name")?.value
    };

    // If the same group has already been added, stopping everything
    if(groupNames.includes(newGroup.name)) {
        return toast({
            title: "La classe n'a pas pu être ajouté.",
            description: `La classe ${newGroup.name} n'a pas pu être ajoutée car une classe du même nom existe déjà.`,
            variant: "destructive"
        })
    }

    // Adding group to the list containing all groups
    allGroups.push(newGroup);
    setGroups(allGroups);

    //Marking this group name as already taken
    allGroupNames.push(newGroup.name);
    setGroupNames(allGroupNames);

    //Asking for refresh and telling user that everything went well
    setNeedRefresh(true);
    toast({
        title: "Classe ajoutée avec succès.",
        description: `La classe ${newGroup.name} avec ${newGroup.level} années avant le bac à été ajoutée avec succès.`
    })
}

let deleteGroup = (groups, setGroups, setNeedRefresh, i, groupNames, setGroupNames, toast) => {
    const allGroups = groups;
    const allGroupNames = groupNames;

    // Retreiving groupName for user feedback
    let oldGroup  = allGroups[i];

    // Removing from lists
    allGroups.splice(i,1);
    allGroupNames.splice(i,1);

    // Applying changes
    setGroups(allGroups);
    setGroupNames(allGroupNames);

    // Asking for refresh + user feedback
    setNeedRefresh(true);
    toast({
        title: "Classe supprimée avec succès.",
        description: `La classe ${oldGroup.name} avec ${oldGroup.level} années avant le bac à été supprimée avec succès.`
    })
}