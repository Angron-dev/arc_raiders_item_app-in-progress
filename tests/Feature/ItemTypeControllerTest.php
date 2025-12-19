<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\ItemType;
use App\Repository\ItemTypeWriteRepository;
use App\Repository\ItemTypeReadRepository;
use Mockery;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ItemTypeControllerTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    #[Test]
    public function test_return_single_item_type_by_id(): void
    {
        $itemType = ItemType::factory()->create();

        $readRepo = Mockery::mock(ItemTypeReadRepository::class);
        $readRepo->shouldReceive('getItemTypeById')
            ->once()
            ->with($itemType->id)
            ->andReturn($itemType);

        $this->app->instance(ItemTypeReadRepository::class, $readRepo);

        $response = $this->getJson(
            route('api.item_type.single', $itemType->id)
        );

        $response->assertStatus(200)
            ->assertJsonFragment([
                'item_type_name' => $itemType->item_type_name,
            ]);
    }

    #[Test]
    public function test_create_item_type_and_redirect(): void
    {
        $writeRepo = Mockery::mock(ItemTypeWriteRepository::class);
        $writeRepo->shouldReceive('save')->once()->with(Mockery::type(ItemType::class));

        $this->app->instance(ItemTypeWriteRepository::class, $writeRepo);

        $response = $this->post(route('api.item_type.create'), ['item_type_name' => 'Test Item Type']);

        $response->assertRedirect(route('item_type.list'));

    }

    #[Test]
    public function test_update_item_type(): void
    {
        $itemType = ItemType::factory()->make(['id' => 1]);

        $readRepo = Mockery::mock(ItemTypeReadRepository::class);
        $readRepo->shouldReceive('getItemTypeById')
            ->once()
            ->with($itemType->id)
            ->andReturn($itemType);

        $this->app->instance(ItemTypeReadRepository::class, $readRepo);

        $response = $this->put(
            route('api.item_type.edit', $itemType->id),
            ['item_type_name' => 'Updated item type name']
        );

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Item updated successfully',
            ]);
    }

    #[Test]
    public function test_delete_item_type_and_redirect(): void
    {
        $itemType = ItemType::factory()->make(['id' => 1]);

        $readRepo = Mockery::mock(ItemTypeReadRepository::class);
        $readRepo->shouldReceive('getItemTypeById')
            ->once()
            ->with($itemType->id)
            ->andReturn($itemType);

        $writeRepo = Mockery::mock(ItemTypeWriteRepository::class);
        $writeRepo->shouldReceive('delete')->once()->with($itemType);

        $this->app->instance(ItemTypeReadRepository::class, $readRepo);
        $this->app->instance(ItemTypeWriteRepository::class, $writeRepo);

        $response = $this->delete(route('api.item_type.delete', $itemType->id));

        $response->assertRedirect(route('item_type.list'));
    }
}
