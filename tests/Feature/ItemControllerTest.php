<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\FoundIn;
use App\Models\Item;
use App\Models\ItemType;
use App\Models\Rarity;
use App\Repository\ItemWriteRepository;
use App\Repository\ItemReadRepository;
use Mockery;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ItemControllerTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    #[Test]
    public function test_return_single_item_by_id(): void
    {
        $item = Item::factory()->create();

        $readRepo = Mockery::mock(ItemReadRepository::class);
        $readRepo->shouldReceive('getItemById')
            ->once()
            ->with($item->id)
            ->andReturn($item);

        $this->app->instance(ItemReadRepository::class, $readRepo);

        $response = $this->getJson(
            route('api.item.single', $item->id)
        );

        $response->assertStatus(200)
            ->assertJsonFragment([
                'item_name' => $item->item_name,
                'price' => $item->price,
                'icon' => $item->icon,
                'description' => $item->description,
                'found_in_id' => $item->found_in_id,
                'rarity_id' => $item->rarity_id,
                'item_type_id' => $item->item_type_id,
                'can_be_deconstructed' => $item->can_be_deconstructed,
            ]);
    }

    #[Test]
    public function test_create_item_and_redirect(): void
    {
        $rarity = Rarity::factory()->create();
        $itemType = ItemType::factory()->create();
        $foundIn = FoundIn::factory()->create();

        $writeRepo = Mockery::mock(ItemWriteRepository::class);
        $writeRepo->shouldReceive('save')
            ->once()
            ->with(Mockery::type(Item::class));

        $this->app->instance(ItemWriteRepository::class, $writeRepo);

        $response = $this->post(route('api.item.create'), [
            'item_name' => 'Item name',
            'price' => 200,
            'icon' => null,
            'description' => 'lorem ipsum',
            'found_in_id' => $foundIn->id,
            'rarity_id' => $rarity->id,
            'item_type_id' => $itemType->id,
            'can_be_deconstructed' => true,
        ]);

        $response->assertRedirect(route('items.list'));
    }

    #[Test]
    public function test_update_item(): void
    {
        $item = Item::factory()->make(['id' => 1]);
        $rarity = Rarity::factory()->create();
        $itemType = ItemType::factory()->create();
        $foundIn = FoundIn::factory()->create();


        $readRepo = Mockery::mock(ItemReadRepository::class);
        $readRepo->shouldReceive('getItemById')
            ->once()
            ->with($item->id)
            ->andReturn($item);

        $this->app->instance(ItemReadRepository::class, $readRepo);

        $response = $this->put(
            route('api.item.edit', $item->id),
            [
                'item_name' => 'Item name',
                'price' => 200,
                'icon' => null,
                'description' => 'lorem ipsum',
                'found_in_id' => $foundIn->id,
                'rarity_id' => $rarity->id,
                'item_type_id' => $itemType->id,
                'can_be_deconstructed' => true,]
        );

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Item updated successfully',
            ]);
    }

    #[Test]
    public function test_delete_item_and_redirect(): void
    {
        $item = Item::factory()->make(['id' => 1]);

        $readRepo = Mockery::mock(ItemReadRepository::class);
        $readRepo->shouldReceive('getItemById')
            ->once()
            ->with($item->id)
            ->andReturn($item);

        $writeRepo = Mockery::mock(ItemWriteRepository::class);
        $writeRepo->shouldReceive('delete')->once()->with($item);

        $this->app->instance(ItemReadRepository::class, $readRepo);
        $this->app->instance(ItemWriteRepository::class, $writeRepo);

        $response = $this->delete(route('item.delete', $item->id));

        $response->assertRedirect(route('items.list'));
    }
}
