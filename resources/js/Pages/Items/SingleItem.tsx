import Header from "@/Layouts/Header";
import Container from "@/Pages/components/Container";
import {usePage} from "@inertiajs/react";
import ItemApi from "@/API/ItemApi";
import {useEffect, useState} from "react";
import Item from "@/Models/Item";
import Spinner from "@/Components/Spinner";
import LootArea from "@/Models/LootArea";
import CurrencyAmount from "@/Components/CurrencyAmount";
import {auto} from "@popperjs/core";
import ItemCard from "@/Pages/components/ItemCard";
import User from "@/Models/User";
import ManageResultsComponentsModal from "@/Pages/Items/ManageResultsComponentsModal";
import ViewButton from "@/Components/Buttons/ViewButton";
import {route} from "ziggy-js";

export default function SingleItem() {
    const { itemId } = usePage<{ itemId: number }>().props;
    const [item, setItem] = useState<Item | null>(null);
    const [deconstructComponents, setDeconstructComponents] = useState<Item[] | null>(null);
    const user = usePage<{ auth: { user: User } }>().props.auth.user;

    const fetchDeconstructComponents = async () => {
        const data = await ItemApi.getDeconstructComponents(itemId);
        setDeconstructComponents(data);
    };

    useEffect(() => {
        const fetchData = async () => {
            const [itemData, components] = await Promise.all([
                ItemApi.getItemById(itemId),
                ItemApi.getDeconstructComponents(itemId)
            ]);
            setItem(itemData);
            setDeconstructComponents(components);
        };
        fetchData();
    }, [itemId]);

    if (!item) return (
        <Header>
            <Spinner/>
        </Header>
    )

    return (
        <Header>
            <Container>
                <div className="row text-center">
                    <h1>{item.item_name}</h1>
                    <p>{item.description}</p>
                </div>
                <div className="row">
                    <div className="col-8">
                        <p> <strong>Type:</strong> {item?.item_type?.item_type_name ?? '-'}</p>
                        <p className='d-flex align-items-center'><strong>Rarity:</strong> <span className='rarity-box' style={{backgroundColor: item.rarity?.color, margin: '0 5px'}}>{item.rarity?.rarity_name ?? '-'}</span> </p>
                        <p className='d-flex align-items-center'>
                            <strong>Loot Area: </strong>
                            {item.loot_areas && item.loot_areas.length > 0 ? (
                                item.loot_areas.map((loot_area: LootArea) => (
                                    <span key={loot_area.id} className="d-flex align-items-center ml-2">
                                    <img
                                        src={loot_area.symbol}
                                        alt={loot_area.loot_area_name}
                                        style={{ height: 30}}
                                    />
                                    <span>{loot_area.loot_area_name}</span>
                                </span>

                                ))
                            ) : (
                                "-"
                            )}
                        </p>
                        <p className='d-flex'><strong>Price: </strong> <CurrencyAmount value={item.price} className='ml-1'/></p>
                    </div>
                    <div className="col-4">
                        <img src={item.icon} alt={item.item_name} style={{ width: '50%', marginLeft: auto}} />
                    </div>
                </div>
            </Container>
            <Container>
                {user !== null && (
                    <>
                        <ManageResultsComponentsModal
                            itemId={itemId}
                            onSave={fetchDeconstructComponents}
                            deconstructComponents={deconstructComponents ?? []}
                        />
                    </>
                )}
                <h2 className='text-center mb-5'>Can be deconstruct into:</h2>
                {(!deconstructComponents || deconstructComponents.length === 0) ? (
                    <p className="text-center">No deconstruct components found</p>
                ) : (
                <table className="table table-sm text-center" style={{verticalAlign: 'middle'}}>
                    <thead>
                        <tr>
                            <th>Icon</th>
                            <th>Item Name</th>
                            <th>Amount</th>
                            <th>Rarity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {deconstructComponents?.map((deconstructComponent: Item) => (
                        <tr key={deconstructComponent.id}>
                            <td><img src={deconstructComponent.icon} alt={deconstructComponent.item_name} style={{ width: 100}} className='mx-auto' /></td>
                            <td>{deconstructComponent.item_name}</td>
                            <td>{deconstructComponent.pivot?.amount}</td>
                            <td><span className='rarity-box' style={{backgroundColor: deconstructComponent.rarity?.color}}>{deconstructComponent.rarity?.rarity_name}</span></td>
                            <td>
                                <ViewButton url={route('item.single', deconstructComponent.id)}>
                                </ViewButton>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>)}
            </Container>
        </Header>
    );
}
